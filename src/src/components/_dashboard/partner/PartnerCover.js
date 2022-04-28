import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
// custom
import { CoverStyle } from '../../_common';

// ----------------------------------------------------------------------

PartnerCover.propTypes = {
  partner: PropTypes.object
};

export default function PartnerCover({ partner }) {
  const { name } = partner;

  return (
    <CoverStyle displayName={name}>
      <Typography variant="h4">{name}</Typography>
      <Typography sx={{ opacity: 0.72 }}>Registered Partner</Typography>
    </CoverStyle>
  );
}
