import PropTypes from 'prop-types';
import createAvatar from '../../utils/createAvatar';
import { MAvatar } from '../@material-extend';

// ----------------------------------------------------------------------

FixedAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

export default function FixedAvatar({ name, height, width }) {
  return (
    <MAvatar
      sx={{
        mx: 'auto',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'common.white',
        width: { xs: width || 40 },
        height: { xs: height || 40 }
      }}
      alt={name}
      color={createAvatar(name).color}
    >
      {createAvatar(name).name}
    </MAvatar>
  );
}
