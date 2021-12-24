import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment, Container, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { register, loadReferral } from '../../../redux/slices/register';
//
import { MIconButton } from '../../@material-extend';
import { setSession } from '../../../utils/jwt';
// custom
import ApiError from '../../_common/Errors';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { refresh } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { referralId } = useParams();
  const { registerSuccess, error, registration, referral, isLoading } = useSelector((state) => state.register);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    businessName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Business name required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      businessName: '',
      referralId: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(
        register(values.email, values.password, values.firstName, values.lastName, values.businessName, referralId)
      );
      setSubmitting(false);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    if (!referralId) return;
    dispatch(loadReferral(referralId));
  }, [dispatch, referralId]);

  useEffect(() => {
    if (!referral) return;
    async function setContent() {
      await setFieldValue('firstName', referral.firstName);
      await setFieldValue('lastName', referral.lastName);
      await setFieldValue('businessName', referral.businessName);
      await setFieldValue('email', referral.email);
    }
    setContent();
  }, [referral, setFieldValue]);

  useEffect(() => {
    if (!registerSuccess) return;

    try {
      enqueueSnackbar('Register success', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      setSession(registration.bearerToken, registration.refreshToken);

      setTimeout(() => {
        refresh();
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }, [registerSuccess, registration, refresh, navigate, enqueueSnackbar, closeSnackbar]);

  return (
    <>
      {registerSuccess && (
        <>
          <Container>
            <Grid container spacing={3} sx={{ p: 3 }}>
              <Grid item xs={12}>
                You're in! Let's go to your home page
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      {!registerSuccess && (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <ApiError error={error} />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>

              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                type="text"
                label="Business name"
                {...getFieldProps('businessName')}
                error={Boolean(touched.businessName && errors.businessName)}
                helperText={touched.businessName && errors.businessName}
              />

              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                Register
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}
