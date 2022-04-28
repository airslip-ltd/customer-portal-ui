import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import { NameValueItem, NameValueList } from '../../_common';

// ----------------------------------------------------------------------

RelationshipAbout.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipAbout({ relationship }) {
  const { invitationDetails } = relationship;

  return (
    <Card>
      <CardHeader title="Invitation Details" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          <NameValueItem name="Business" value={invitationDetails.businessName} />
          <NameValueItem name="Contact" value={`${invitationDetails.firstName} ${invitationDetails.lastName}`} />
          <NameValueItem name="Email" value={invitationDetails.email} />
          <NameValueItem name="Phone" value={invitationDetails.phoneNumber} />
        </NameValueList>
      </CardContent>
    </Card>
  );
}
