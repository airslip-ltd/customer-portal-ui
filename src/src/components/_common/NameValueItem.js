import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import circle from '@iconify/icons-ic/outline-circle';
import minus from '@iconify/icons-ic/outline-minus';
// material
import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(() => ({
  width: 10,
  height: 10,
  marginTop: 6,
  flexShrink: 0
}));

// ----------------------------------------------------------------------

NameValueItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};

export default function NameValueItem({ name, value }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconStyle icon={circle} />
      <Box sx={{ textTransform: 'capitalize', fontWeight: 'light', fontSize: 12 }}>{name}</Box>
      <IconStyle icon={minus} sx={{ top: 5, position: 'relative' }} />
      <Box sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 12 }}>{value}</Box>
    </Stack>
  );
}
