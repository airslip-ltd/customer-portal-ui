import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import { decodeError } from '../../../utils/utils';

ApiError.propTypes = {
  error: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default function ApiError(props) {
  const { error } = props;
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(`${errors[0].errorCode}: ${errors[0].message}`);
  }, [error, setErrorDetails]);

  return (
    <>
      {errorDetails && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>{props.title}</AlertTitle>
          {errorDetails}
        </Alert>
      )}
    </>
  );
}
