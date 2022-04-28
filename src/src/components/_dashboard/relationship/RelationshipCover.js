import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
// custom
import { CoverStyle } from '../../_common';

// ----------------------------------------------------------------------

RelationshipCover.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipCover({ relationship }) {
  const { invitationDetails, relationshipStatus, related } = relationship;
  const { business } = related || { business: {} };

  return (
    <CoverStyle displayName={business.name || invitationDetails.businessName}>
      <Typography variant="h4">{business.name || invitationDetails.businessName}</Typography>
      <Typography sx={{ opacity: 0.72 }}>{relationshipStatus}</Typography>
    </CoverStyle>
  );
}
