import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography, FormGroup } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { create, reset } from '../../../redux/slices/relationship';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import ApiError from '../../_common/Errors/ApiError';
import HelpCard from '../../_common/HelpCard';
import { featureEnabled } from '../../../utils/feature-switch';

// ----------------------------------------------------------------------

export default function RelationshipCreateForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { current } = useSelector((state) => state.relationship);
  const navigate = useNavigate();

  const permissions = [
    {
      label: 'Banking',
      value: 'Banking'
    },
    {
      label: 'Commerce',
      value: 'Commerce'
    }
  ];

  if (featureEnabled('accounting-integrations')) {
    permissions.push({
      label: 'Accounting',
      value: 'Accounting'
    });
  }

  const NewUserSchema = Yup.object().shape({
    businessName: Yup.string().required('Company name is required'),
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      businessName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      permission: []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(create(values));
      setSubmitting(false);
    }
  });

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar('Invitation sent', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.relationship.view}/${current.response.currentVersion.id}`);
      });
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <ApiError error={current.error} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle2">Relationship Details</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                Please tell us who you would like to invite to join Airslip. They will automatically receive an
                invitation to sign up as your customer.
              </Typography>

              <Stack spacing={3} sx={{ py: 3 }}>
                <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    {...getFieldProps('businessName')}
                    error={Boolean(touched.businessName && errors.businessName)}
                    helperText={touched.businessName && errors.businessName}
                  />
                </Stack>
              </Stack>

              <Typography variant="subtitle2">Contact Details</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                Please enter the contact details of your main contact at the customer, this should be someone who has
                authority to sign up to Airslip.
              </Typography>
              <Stack spacing={3} sx={{ py: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>
              </Stack>

              <Typography variant="subtitle2">Data Access</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
                Please select which data you would like access to by using the options below.
              </Typography>

              <Stack spacing={3} sx={{ pt: 3 }}>
                <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
                  <FormGroup>
                    {permissions.map((opt) => (
                      <Field
                        type="checkbox"
                        component={CheckboxWithLabel}
                        name="permission"
                        key={opt.value}
                        value={opt.value}
                        Label={{ label: opt.label }}
                      />
                    ))}
                  </FormGroup>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={current.loading}>
                    Send Invitation
                  </LoadingButton>
                </Box>
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
