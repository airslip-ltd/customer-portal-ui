import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
// redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../redux/store';
import { update, reset } from '../../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import HelpSection from '../../_common/HelpSection';
import ApiError from '../../_common/Errors/ApiError';

// ----------------------------------------------------------------------

PartnerEditForm.propTypes = {
  currentRecord: PropTypes.object
};

export default function PartnerEditForm({ currentRecord }) {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.partner);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const EditSchema = Yup.object().shape({
    name: Yup.string().required('Partner Name is required')
  });

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      dispatch(reset()).then(() => {
        enqueueSnackbar('Update success', { variant: 'success' });
        navigate(`${PATH_DASHBOARD.partner.view}/${current.response.currentVersion.id}`);
      });
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentRecord?.name || ''
    },
    validationSchema: EditSchema,
    onSubmit: async (values) => {
      dispatch(update(currentRecord.id, values));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ApiError error={current.error} />
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Partner Details</Typography>
                  <TextField
                    fullWidth
                    label="Partner Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={current.loading}>
                      Save Changes
                    </LoadingButton>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
            <HelpCard>
              <HelpSection title="Partner Details">
                <Typography variant="body2">Provide updates as required, select Save Changes once complete.</Typography>
              </HelpSection>
            </HelpCard>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
