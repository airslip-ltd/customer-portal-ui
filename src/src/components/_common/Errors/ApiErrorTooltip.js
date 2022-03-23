import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';
import { decodeError } from '../../../utils/utils';

ApiErrorTooltip.propTypes = {
  error: PropTypes.object.isRequired
};

export default function ApiErrorTooltip({ error }) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(`${errors[0].errorCode}: ${errors[0].message}`);
  }, [error, setErrorDetails]);

  return (
    <>
      {errorDetails && (
        <Tooltip title={errorDetails}>
          <ErrorIcon />
        </Tooltip>
      )}
    </>
  );
}
