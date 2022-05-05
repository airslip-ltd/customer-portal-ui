import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { OutlinedInput, InputAdornment, IconButton, Typography, Stack } from '@mui/material';
// redux
import { ContentCopy, Check } from '@mui/icons-material';

// ----------------------------------------------------------------------

ApiKeyView.propTypes = {
  apiKey: PropTypes.object
};

export default function ApiKeyView({ apiKey }) {
  const [clipboard, setClipboard] = useState(false);

  const { tokenValue } = apiKey;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenValue);
    setClipboard(true);

    setTimeout(() => {
      setClipboard(false);
    }, 3000);
  };

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="body2">Your Token</Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type="text"
        disabled
        value={tokenValue}
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={copyToClipboard} edge="end">
              {clipboard ? <Check /> : <ContentCopy />}
            </IconButton>
          </InputAdornment>
        }
        label="Api Key Token"
      />
    </Stack>
  );
}
