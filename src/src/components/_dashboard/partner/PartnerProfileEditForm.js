import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
// redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../redux/store';
import { updateMyDetails, reset } from '../../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import ApiError from '../../_common/Errors/ApiError';

// ----------------------------------------------------------------------

PartnerProfileEditForm.propTypes = {
  currentRecord: PropTypes.object
};

export default function PartnerProfileEditForm({ currentRecord }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.partner);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const EditSchema = Yup.object().shape({
    name: Yup.string().required('Partner Name is required')
  });

  useEffect(() => {
    if (profile.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar('Update success', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.partner.profile.view}`);
      });
    }
  }, [profile, dispatch, enqueueSnackbar, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentRecord?.name || ''
    },
    validationSchema: EditSchema,
    onSubmit: async (values) => {
      dispatch(updateMyDetails(values));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ApiError error={profile.error} />
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Partner Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={profile.loading}>
                    Save Changes
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
