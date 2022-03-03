import PropTypes from 'prop-types';
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

CaptureStoreName.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function CaptureStoreName({ onClose, open }) {
  const formik = useFormik({
    initialValues: {
      shop: ''
    },
    validationSchema: Yup.object().shape({
      shop: Yup.string().required('Shop is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      onClose(values);
      setSubmitting(false);
    }
  });

  const handleCancel = () => {
    onClose(null);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Please provide your store name</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogContentText sx={{ mb: 2 }}>
              To add this provider, please tell us the name of your store.
            </DialogContentText>
            <TextField
              fullWidth
              label="Shop"
              {...getFieldProps('shop')}
              error={Boolean(touched.shop && errors.shop)}
              helperText={touched.shop && errors.shop}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Done
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
