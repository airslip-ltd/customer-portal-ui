import PropTypes from 'prop-types';
// material
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select account type</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item) => (
          <ListItem button onClick={() => handleListItemClick(item)} key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
