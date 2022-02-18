import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment, Card, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { register, reset } from '../../../redux/slices/partner';
//
import { MIconButton } from '../../@material-extend';
// custom
import ApiError from '../../_common/Errors';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function PartnerRegisterForm() {
  const { refresh } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { registerSuccess, error, registration, isLoading } = useSelector((state) => state.partner);
  const navigate = useNavigate();

  reset();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    partnerName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Partner name required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: 'This',
      lastName: 'Test',
      email: 't@a.com',
      password: 'Test1234!',
      partnerName: 'Im a partner'
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(register(values.email, values.password, values.firstName, values.lastName, values.partnerName));
      setSubmitting(false);
    }
  });

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
    } catch (error) {
      console.error(error);
    }
  }, [registerSuccess, registration, refresh, navigate, enqueueSnackbar, closeSnackbar]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle2">Partner Details</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                Please provide details of the main user who will be able to login on behalf of the Partner and
                administer the system.
              </Typography>

              <ApiError error={error} />

              <Stack spacing={2} sx={{ py: 3 }}>
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

                <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
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
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                  Now give us some details about the partner themselves.
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Partner name"
                    {...getFieldProps('partnerName')}
                    error={Boolean(touched.partnerName && errors.partnerName)}
                    helperText={touched.partnerName && errors.partnerName}
                  />
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                    Register
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
