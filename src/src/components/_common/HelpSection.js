import PropTypes from 'prop-types';
// material
import { Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

HelpSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
};

export default function HelpSection({ children, title }) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{title}</Typography>
      <>{children}</>
    </Stack>
  );
}
