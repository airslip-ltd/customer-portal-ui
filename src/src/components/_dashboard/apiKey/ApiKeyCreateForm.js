import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
// redux
import { FormSection } from '../../_common';
import { useDispatch, useSelector } from '../../../redux/store';
import { create, reset } from '../../../redux/slices/apiKey';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import HelpCard from '../../_common/HelpCard';
import ApiError from '../../_common/Errors/ApiError';
import ApiKeyView from './ApiKeyView';

// ----------------------------------------------------------------------

export default function ApiKeyCreateForm() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.apiKey);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required')
  });

  useEffect(() => {
    if (current.status === 'success') {
      enqueueSnackbar('Create success', { variant: 'success' });
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const handleDone = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.apiKey.view}/${current.response.currentVersion.id}`);
    });
  }, [current, dispatch, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: ''
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
            <Stack spacing={3}>
              <ApiError error={current.error} />
              <Card>
                <CardHeader title="Api Key Details" />
                <CardContent>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Key Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    {current.complete && (
                      <FormSection
                        title="Your Token"
                        message="This is your Api Key Token and can only be retrieved this once. Please make sure you copy and store it securely for use when calling our APIs."
                      >
                        <ApiKeyView apiKey={current.response.currentVersion} />
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button onClick={handleDone} variant="contained" loading={current.loading}>
                            Done
                          </Button>
                        </Box>
                      </FormSection>
                    )}

                    {!current.complete && (
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={current.loading}>
                          Create Api Key
                        </LoadingButton>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
            <HelpCard>Here is some content</HelpCard>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
