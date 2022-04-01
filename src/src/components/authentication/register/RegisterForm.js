import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment, Grid, Typography, Link, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormSection } from '../../_common';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { register, loadReferral } from '../../../redux/slices/register';
//
import { MIconButton } from '../../@material-extend';
import { setSession } from '../../../utils/jwt';
// custom
import ApiError from '../../_common/Errors/ApiError';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { refresh } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [fromReferral, setFromReferral] = useState(false);
  const dispatch = useDispatch();
  const { referralId } = useParams();
  const { registerSuccess, error, registration, referral, isLoading } = useSelector((state) => state.register);

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
    setFromReferral(true);
    async function setContent() {
      await setFieldValue('firstName', referral.firstName);
      await setFieldValue('lastName', referral.lastName);
      await setFieldValue('businessName', referral.businessName);
      await setFieldValue('email', referral.email);
    }
    setContent();
  }, [referral, setFieldValue, setFromReferral]);

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

      refresh();
    } catch (error) {
      console.error(error);
    }
  }, [registerSuccess, registration, refresh, enqueueSnackbar, closeSnackbar]);

  const handleEditSwitch = () => {
    setFromReferral(false);
  };

  return (
    <>
      <ApiError error={error} />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {fromReferral && (
            <>
              <FormSection
                title="Or create one, completely free!"
                message="As you were referred by one of our partners we already have an idea of who you are! If the details below are incorrect select the option to change them."
              >
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="body2">Your name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">
                      {referral.firstName} {referral.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">Business name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">{referral.businessName}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">Email address:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">{referral.email}</Typography>
                  </Grid>
                </Grid>
                <Stack spacing={0}>
                  <Typography variant="h5">Let's create your account</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                    We'll use your email address {referral.email} as your username.
                  </Typography>
                </Stack>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    size="small"
                    autoComplete="new-password"
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

                  <Box sx={{ display: 'flex' }}>
                    <Button fullWidth size="medium" onClick={handleEditSwitch} variant="text">
                      Thats not me
                    </Button>

                    <LoadingButton fullWidth size="medium" type="submit" variant="contained" loading={isLoading}>
                      Looks good
                    </LoadingButton>
                  </Box>
                </Stack>
              </FormSection>
            </>
          )}

          {!fromReferral && (
            <FormSection
              title="Or create one, completely free!"
              message="You only need to give us a few details to get started with Airslip"
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  size="small"
                  autoComplete="new-password"
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

                <Typography variant="body" gutterBottom>
                  What should we call you?
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="First name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Last name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Business name"
                  {...getFieldProps('businessName')}
                  error={Boolean(touched.businessName && errors.businessName)}
                  helperText={touched.businessName && errors.businessName}
                />

                <LoadingButton fullWidth size="medium" type="submit" variant="contained" loading={isLoading}>
                  Register
                </LoadingButton>
              </Stack>
            </FormSection>
          )}
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, You agree to our&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Form>
      </FormikProvider>
    </>
  );
}
