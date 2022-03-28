import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { ApiError } from '.';
import { decodeError, formatError } from '../../../utils/utils';
import HelpDialogue from '../HelpDialogue';

ApiErrorDetailed.propTypes = {
  error: PropTypes.object.isRequired
};

export default function ApiErrorDetailed({ error }) {
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const errors = decodeError(error);
    if (errors.length > 0) setErrorDetails(formatError(errors[0]));
  }, [error, setErrorDetails]);

  return (
    <>
      {errorDetails && (
        <Stack sx={{ display: 'flex' }} direction="row" spacing={1}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1}>
              <ApiError error={error} title="Something went wrong" />
            </Stack>
            <HelpDialogue title="What can I do?">
              Please let us know, you can use the feedback box at the bottom of the page.
            </HelpDialogue>
          </Stack>
        </Stack>
      )}
    </>
  );
}
