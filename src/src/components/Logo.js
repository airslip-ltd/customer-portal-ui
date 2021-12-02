import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 200, height: 40, ...sx }}>
      <img alt="airslip logo" src="/static/logo_text_r.png" />
    </Box>
  );
}
