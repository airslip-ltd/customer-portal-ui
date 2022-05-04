import PropTypes from 'prop-types';
// material
import { Box, Stack, styled } from '@mui/material';
import { Icon } from '@iconify/react';
import arrows from '@iconify/icons-ic/round-compare-arrows';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(() => ({
  width: 35,
  height: 35,
  marginTop: 8,
  flexShrink: 0
}));

// ----------------------------------------------------------------------

ConnectHeader.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired
};

export default function ConnectHeader({ left, right }) {
  return (
    <Stack direction="row" spacing={1}>
      {left}
      <Box>
        <IconStyle icon={arrows} />
      </Box>
      {right}
    </Stack>
  );
}
