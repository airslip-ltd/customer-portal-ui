import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { create, reset } from '../../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import HelpSection from '../../_common/HelpSection';
import ApiError from '../../_common/Errors/ApiError';

// ----------------------------------------------------------------------

export default function PartnerCreateForm() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.partner);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    partnerName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Partner name required')
  });

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar('Create success', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.partner.view}/${current.response.currentVersion.id}`);
      });
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      partnerName: ''
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
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6">Administrator Details</Typography>
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
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6">Partner Details</Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Partner name"
                        {...getFieldProps('partnerName')}
                        error={Boolean(touched.partnerName && errors.partnerName)}
                        helperText={touched.partnerName && errors.partnerName}
                      />
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={current.loading}>
                          Create Partner
                        </LoadingButton>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
            <HelpCard>
              <Stack spacing={4}>
                <HelpSection title="Administrator Details">
                  <Typography variant="body2">
                    Please tell us who the initial administrative user will be for your new partner. They will receive
                    an invitation to join Airslip using the provided email address.
                  </Typography>
                </HelpSection>
                <HelpSection title="Partner Details">
                  <Typography variant="body2">
                    Tell us as much as you can about the Partner you would like to add to Airslip.
                  </Typography>
                </HelpSection>
              </Stack>
            </HelpCard>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
