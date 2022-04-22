import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { TextField, Box } from '@mui/material';

// ----------------------------------------------------------------------
const decoratorStyle = {
  padding: 15,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'rgba(145, 158, 171, 0.32)',
  borderStyle: 'solid',
  borderWidth: 1
};

const RightHelperStyle = styled(Box)(({ theme }) => ({
  ...decoratorStyle,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.grey[500_16],
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  borderLeft: 'none !important'
}));

const LeftHelperStyle = styled(Box)(({ theme }) => ({
  ...decoratorStyle,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.grey[500_16],
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  borderLeft: 'none !important'
}));

const TextFieldNoHelpers = styled(TextField)(() => ({
  fieldset: {
    borderRadius: 10
  }
}));

const TextFieldBothHelpers = styled(TextField)(() => ({
  fieldset: {
    borderRadius: 0
  }
}));

const TextFieldLeftHelper = styled(TextField)(() => ({
  fieldset: {
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
}));

const TextFieldRightHelper = styled(TextField)(() => ({
  fieldset: {
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
}));

TextFieldRender.propTypes = {
  validation: PropTypes.object.isRequired
};

function TextFieldRender({ validation, ...other }) {
  if (validation.leftOperator && validation.rightOperator) {
    return <TextFieldBothHelpers fullWidth variant="outlined" size="small" {...other} />;
  }
  if (validation.leftOperator) {
    return <TextFieldLeftHelper fullWidth variant="outlined" size="small" {...other} />;
  }
  if (validation.rightOperator) {
    return <TextFieldRightHelper fullWidth variant="outlined" size="small" {...other} />;
  }

  return <TextFieldNoHelpers fullWidth variant="outlined" size="small" {...other} />;
}

TextFieldWithHelper.propTypes = {
  validation: PropTypes.object.isRequired
};

export default function TextFieldWithHelper({ validation, ...other }) {
  return (
    <Box sx={{ display: 'flex' }}>
      {validation.leftOperator && <LeftHelperStyle sx={{ flexGrow: 1 }}>{validation.leftOperator}</LeftHelperStyle>}
      <TextFieldRender validation={validation} {...other} />
      {validation.rightOperator && <RightHelperStyle sx={{ flexGrow: 1 }}>{validation.rightOperator}</RightHelperStyle>}
    </Box>
  );
}
