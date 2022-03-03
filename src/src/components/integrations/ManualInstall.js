import PropTypes from 'prop-types';
// material
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, Box } from '@mui/material';

ManualInstall.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function ManualInstall({ onClose, open }) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Manual Installation</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          To install this provider you will need to contact our support team as there are some manual steps required...
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
