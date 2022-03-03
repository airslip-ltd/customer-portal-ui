import PropTypes from 'prop-types';
// material
import { Typography, Box } from '@mui/material';

CardOverlay.propTypes = {
  title: PropTypes.string.isRequired
};

export default function CardOverlay({ title }) {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Box
        style={{
          position: 'absolute',
          backgroundColor: 'grey',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: 0.2,
          pt: 3,
          textAlign: 'center'
        }}
      />
      <Typography variant="h4" sx={{ mt: 3 }}>
        {title}
      </Typography>
    </Box>
  );
}
