import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { create, reset } from '../../../redux/slices/business';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import ApiError from '../../_common/Errors/ApiError';

// ----------------------------------------------------------------------

export default function BusinessCreateForm() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.business);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    businessName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Business name required')
  });

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar('Create success', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.business.view}/${current.response.currentVersion.id}`);
      });
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      businessName: ''
    },
    validationSchema: NewSchema,
    onSubmit: async (values) => {
      dispatch(create(values));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ApiError error={current.error} />
            <Card sx={{ p: 3 }}>
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
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                  Now give us some details about the business themselves.
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Business name"
                    {...getFieldProps('businessName')}
                    error={Boolean(touched.businessName && errors.businessName)}
                    helperText={touched.businessName && errors.businessName}
                  />
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={current.loading}>
                      Create Business
                    </LoadingButton>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
            <HelpCard>Here is some content</HelpCard>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
