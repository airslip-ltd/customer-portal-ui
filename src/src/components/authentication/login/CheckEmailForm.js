import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormSection } from '../../_common';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { checkEmail } from '../../../redux/slices/auth';

// ----------------------------------------------------------------------

export default function CheckEmailForm() {
  const dispatch = useDispatch();
  const { check } = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      dispatch(checkEmail(values.email));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormSection title="Let's see if you already have an account" message="Please tell us your email address." />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

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
            <LoadingButton fullWidth size="medium" type="submit" variant="contained" loading={check.loading}>
              Continue
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
