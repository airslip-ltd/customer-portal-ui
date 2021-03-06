import PropTypes from 'prop-types';
// material
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

NameValueList.propTypes = {
  children: PropTypes.node.isRequired
};

export default function NameValueList({ children }) {
  return <Stack spacing={0.5}>{children}</Stack>;
}
