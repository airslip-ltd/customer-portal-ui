import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import { decodeError, formatError } from '../../../utils/utils';

ApiError.propTypes = {
  error: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default function ApiError(props) {
  const { error } = props;
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(formatError(errors[0]));
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
