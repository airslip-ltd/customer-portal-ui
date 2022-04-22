import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';

Error.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default function Error({ title, children }) {
  return (
    <Alert severity="error" sx={{ mb: 3 }}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
}
