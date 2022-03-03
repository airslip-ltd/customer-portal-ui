import PropTypes from 'prop-types';
// material
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, Box } from '@mui/material';

ComingSoon.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function ComingSoon({ onClose, open }) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Coming Soon</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          This provider isn't completely integrated as yet, please check back soon.
        </DialogContentText>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleCancel}>
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
