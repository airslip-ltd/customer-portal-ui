import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
//
import { CoverStyle } from '../../_common';

// ----------------------------------------------------------------------

RelationshipCover.propTypes = {
  consent: PropTypes.object
};

export default function RelationshipCover({ consent }) {
  const { partner, relationshipStatus } = consent;

  return (
    <CoverStyle displayName={partner.name}>
      <Typography variant="h4">{partner.name}</Typography>
      <Typography sx={{ opacity: 0.72 }}>{relationshipStatus}</Typography>
    </CoverStyle>
  );
}
