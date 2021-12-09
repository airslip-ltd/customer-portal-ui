import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import Label from '../../Label';

// ----------------------------------------------------------------------

MerchantRating.propTypes = {
  score: PropTypes.number
};

export default function MerchantRating({ score }) {
  const theme = useTheme();

  return (
    <Label
      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
      color={(score <= 30 && 'success') || (score > 30 && score <= 70 && 'warning') || 'error'}
    >
      {score}%
    </Label>
  );
}
