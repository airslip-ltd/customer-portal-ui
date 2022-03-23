import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import { decodeError } from '../../../utils/utils';

ApiErrorTooltip.propTypes = {
  error: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default function ApiErrorTooltip({ error, children }) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(`${errors[0].errorCode}: ${errors[0].message}`);
  }, [error, setErrorDetails]);

  return (
    <>
      {errorDetails && (
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <Box>
            <Tooltip title={errorDetails}>
              <ErrorIcon />
            </Tooltip>
          </Box>
        </Box>
      )}
    </>
  );
}
