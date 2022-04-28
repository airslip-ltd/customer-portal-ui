import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
// custom
import { CoverStyle } from '../../../_common';

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  user: PropTypes.object
};

export default function ProfileCover({ user }) {
  const { userRole, displayName } = user;

  return (
    <CoverStyle displayName={displayName}>
      <Typography variant="h4">{displayName}</Typography>
      <Typography sx={{ opacity: 0.72 }}>{userRole}</Typography>
    </CoverStyle>
  );
}
