import PropTypes from 'prop-types';
// material
import { Dialog, DialogTitle, DialogContent, Button, Box, Stack } from '@mui/material';

Confirmation.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default function Confirmation({ onCancel, onConfirm, open, title, children }) {
  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box>{children}</Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1} sx={{ pt: 3 }}>
            <Button variant="contained" onClick={handleCancel}>
              No
            </Button>
            <Button variant="contained" onClick={handleConfirm}>
              Yes
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
