import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
//
import { CoverStyle } from '../../_common';

// ----------------------------------------------------------------------

BusinessCover.propTypes = {
  business: PropTypes.object
};

export default function BusinessCover({ business }) {
  const { name } = business;

  return (
    <CoverStyle displayName={name}>
      <Typography variant="h4">{name}</Typography>
      <Typography sx={{ opacity: 0.72 }}>Registered Business</Typography>
    </CoverStyle>
  );
}
