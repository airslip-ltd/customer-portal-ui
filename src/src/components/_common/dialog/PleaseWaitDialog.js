import PropTypes from 'prop-types';
// material
import { Stack, Dialog, DialogContent, Box, Typography } from '@mui/material';
import { LoadingProgress } from '../progress';

PleaseWaitDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default function PleaseWaitDialog({ open, children }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ minWidth: 250 }}>
                Please wait...
              </Typography>
              <>{children}</>
            </Stack>
          </Box>
          <Box>
            <LoadingProgress />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
