import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

HelpDialogue.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default function HelpDialogue({ title, children, ...other }) {
  return (
    <>
      <Alert icon={<InfoOutlined fontSize="inherit" />} severity="info" {...other}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </>
  );
}
