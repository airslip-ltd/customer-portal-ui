import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../redux/store';
import { update, create, reset } from '../../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import ApiError from '../../_common/Errors/ApiError';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const USER_ROLE = ['Administrator', 'Manager', 'User'];

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    displayName: Yup.string().required('Display Name is required'),
    email: Yup.string().required('Email is required').email(),
    userRole: Yup.string().required('User Role is required')
  });

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.user.view}/${current.response.currentVersion.id}`);
      });
    }
  }, [current, dispatch, enqueueSnackbar, navigate, isEdit]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      userRole: currentUser?.userRole || USER_ROLE[2]
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        dispatch(update(currentUser.id, values));
      } else {
        dispatch(create(values));
      }
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
              <Stack spacing={3}>
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
                    label="Display Name"
                    {...getFieldProps('displayName')}
                    error={Boolean(touched.displayName && errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
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
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <div>
                    <LabelStyle>Role</LabelStyle>
                    <RadioGroup {...getFieldProps('userRole')} row>
                      <Stack spacing={1} direction="row">
                        {USER_ROLE.map((role) => (
                          <FormControlLabel key={role} value={role} control={<Radio />} label={role} />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={current.loading}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
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
