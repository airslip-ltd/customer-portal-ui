import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

HelpDialogue.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default function HelpDialogue({ title, children }) {
  return (
    <>
      <Alert icon={<InfoOutlined fontSize="inherit" />} severity="info" sx={{ mb: 3 }}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </>
  );
}
