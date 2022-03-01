import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default function FormSection({ children, title, message }) {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
        {message}
      </Typography>

      <Stack spacing={3} sx={{ py: 3 }}>
        {children}
      </Stack>
    </>
  );
}
