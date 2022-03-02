// material
import { Box, Typography } from '@mui/material';
// layouts
import PropTypes from 'prop-types';
import ExternalFixedLayout from './ExternalFixedLayout';
// components
import ExternalHeader from '../components/_common/ExternalHeader';

OnboardingLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  action: PropTypes.node
};

// ----------------------------------------------------------------------

export default function OnboardingLayout({ children, title, message, progress, action }) {
  return (
    <ExternalFixedLayout title={`${title} | Getting Started`}>
      <ExternalHeader title="Getting Started" progress={progress} />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          <Typography variant="h5">{title}</Typography>
          {message && (
            <Typography variant="body2" sx={{ color: 'text.secondary', pt: 0.5 }}>
              {message}
            </Typography>
          )}
        </Box>
        {action && <Box>{action}</Box>}
      </Box>

      {children}
    </ExternalFixedLayout>
  );
}
