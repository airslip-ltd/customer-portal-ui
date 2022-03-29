import PropTypes from 'prop-types';
// material
import { Link, Typography, Box } from '@mui/material';
import { LoadingProgress, LoadingFailed } from '.';
import { REQUEST_STATES } from '../../../redux/common/constants';

// ----------------------------------------------------------------------

LoadingView.propTypes = {
  apiRequest: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default function LoadingView({ apiRequest, children }) {
  if (apiRequest.status === REQUEST_STATES.success) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        {apiRequest.status === REQUEST_STATES.failed && (
          <>
            <Typography variant="body2">
              Something went wrong fetching your data, if this continues please contact &nbsp;
              <Link href="mailto:support@airslip.com">support@airslip.com</Link>
            </Typography>
          </>
        )}
      </Box>
      <Box>
        {apiRequest.status === REQUEST_STATES.loading && <LoadingProgress size={40} />}
        {apiRequest.status === REQUEST_STATES.failed && <LoadingFailed size={40} />}
      </Box>
    </Box>
  );
}
