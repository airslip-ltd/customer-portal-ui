import PropTypes from 'prop-types';
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Box,
  Stack,
  Link,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { TextFieldWithHelper } from '../_common/input';
import { HelpDialogue } from '../_common';
import ProviderImage from './ProviderImage';
import { storeValidation, nullValidation, validateStore, buildUrl } from './data/StoreValidation';
import { Error } from '../_common/Errors';

// ----------------------------------------------------------------------

CaptureStoreName.propTypes = {
  provider: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function CaptureStoreName({ onClose, open, provider }) {
  const [validation, setValidation] = useState({});
  const [validating, setValidating] = useState(false);
  const [failedValidation, setFailedValidation] = useState(false);

  useEffect(() => {
    if (!provider) return;

    setValidation(storeValidation[provider.id] || nullValidation);
  }, [provider, setValidation]);

  const formik = useFormik({
    initialValues: {
      shop: ''
    },
    validationSchema: Yup.object().shape({
      shop: Yup.string().required(`${validation.storeLabel} is required`)
    }),
    onSubmit: async (values, { setSubmitting }) => {
      handleComplete(values);
      setSubmitting(false);
    }
  });

  const handleComplete = async (values) => {
    setFailedValidation(false);
    if (!validation.validateUrl) {
      closeWithShop(values);
    }

    setValidating(true);
    if (await validateStore(values.shop, validation)) {
      closeWithShop(values);
    } else {
      setFailedValidation(true);
    }
    setValidating(false);
  };

  const closeWithShop = (values) => {
    onClose({ shop: buildUrl(values.shop, validation) });
  };

  const handleCancel = () => {
    onClose(null);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  if (!provider) return <></>;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        <Stack spacing={1} direction="row">
          <ProviderImage
            width={30}
            height={30}
            provider={provider.id}
            integrationType={provider.integrationType}
            fileType="icon"
          />
          <Box>Let's connect {provider.friendlyName}</Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <DialogContentText>
                For us to complete a connection {provider.friendlyName} we need your {validation.storeLabel}.
              </DialogContentText>

              <TextFieldWithHelper
                validation={validation}
                label={validation.storeLabel}
                {...getFieldProps('shop')}
                error={Boolean(touched.shop && errors.shop)}
                helperText={touched.shop && errors.shop}
              />

              {failedValidation && (
                <Error title={`Unable to verify ${validation.storeLabel}`}>
                  Please check your {validation.storeLabel} and try again.
                </Error>
              )}

              {validation.helpText && (
                <Stack spacing={1}>
                  <Typography variant="body2">{validation.helpText}</Typography>
                  <Box component="img" src={validation.helpImage} sx={{ opacity: 0.8 }} />
                </Stack>
              )}

              {validation.knowledgeArticle && (
                <HelpDialogue title="Need some help?">
                  If you're stuck and need some help, please have a look at this&nbsp;
                  <Link href={validation.knowledgeArticle} target="_blank">
                    knowledge article
                  </Link>
                </HelpDialogue>
              )}

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleCancel} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <LoadingButton variant="contained" type="submit" loading={validating}>
                  Done
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
