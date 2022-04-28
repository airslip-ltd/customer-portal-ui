import PropTypes from 'prop-types';
// material
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ProviderImage from './ProviderImage';

MultiProviderSelection.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default function MultiProviderSelection({ onClose, open, items }) {
  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  if (items.length === 0) return <></>;

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Select your Service</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ py: 1 }}>
          There are multiple Services available for {items[0].friendlyName}, please select the correct one to proceed
        </DialogContentText>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: '100%'
          }}
        >
          <List sx={{ pt: 0 }}>
            {items.map((item) => (
              <ListItem button onClick={() => handleListItemClick(item)} key={item.id}>
                <ListItemIcon>
                  <ProviderImage provider={item.integration} integrationType={item.integrationType} fileType="icon" />
                </ListItemIcon>
                <ListItemText primary={item.friendlyName} secondary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
