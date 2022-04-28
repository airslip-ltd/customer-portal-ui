import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import circle from '@iconify/icons-ic/outline-circle';
import minus from '@iconify/icons-ic/outline-minus';
// material
import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(() => ({
  width: 15,
  height: 15,
  marginTop: '2px',
  flexShrink: 0
}));

// ----------------------------------------------------------------------

NameValueItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  icon: PropTypes.node
};

export default function NameValueItem({ name, value, icon }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconStyle icon={icon || circle} />
      <Box sx={{ textTransform: 'capitalize', fontWeight: 'light', fontSize: 12 }}>{name}</Box>
      <IconStyle icon={minus} sx={{ top: 3, position: 'relative' }} />
      <Box sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 12 }}>{value}</Box>
    </Stack>
  );
}
