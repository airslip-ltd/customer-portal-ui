import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

CardOverlay.propTypes = {
  children: PropTypes.node.isRequired
};

export default function CardOverlay({ children }) {
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
          backgroundColor: '#fff',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: 0.8,
          pt: 3,
          textAlign: 'center'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          pt: 3
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
