import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import Done from '@mui/icons-material/Done';

SuccessDialogue.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  action: PropTypes.node
};

export default function SuccessDialogue({ title, children, ...other }) {
  return (
    <>
      <Alert icon={<Done fontSize="inherit" />} severity="success" sx={{ mb: 3 }} {...other}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </>
  );
}
