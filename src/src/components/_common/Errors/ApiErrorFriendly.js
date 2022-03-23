import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Stack, Typography } from '@mui/material';
import { ApiErrorTooltip } from '.';
import { decodeError } from '../../../utils/utils';
import HelpDialogue from '../HelpDialogue';

ApiErrorFriendly.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired
};

export default function ApiErrorFriendly({ error, message }) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(`${errors[0].errorCode}: ${errors[0].message}`);
  }, [error, setErrorDetails]);

  return (
    <>
      {errorDetails && (
        <Stack sx={{ display: 'flex' }} direction="row" spacing={1}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1}>
              <ApiErrorTooltip error={error} />
              <Typography variant="body2">{message}</Typography>
            </Stack>
            <HelpDialogue title="What can I do?">
              Try again, if the problem continues please contact &nbsp;
              <Link href="mailto:support@airslip.com">support@airslip.com</Link>
            </HelpDialogue>
          </Stack>
        </Stack>
      )}
    </>
  );
}
