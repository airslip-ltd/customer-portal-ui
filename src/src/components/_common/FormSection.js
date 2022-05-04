import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

FormSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default function FormSection({ children, title, message, ...other }) {
  return (
    <Box {...other}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5">{title}</Typography>
          {message && (
            <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
              {message}
            </Typography>
          )}
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
}
