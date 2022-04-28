import PropTypes from 'prop-types';
import approved from '@iconify/icons-ic/baseline-check-circle-outline';
import invited from '@iconify/icons-ic/baseline-query-builder';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import { fDateFromLong } from '../../../utils/formatDate';
import { NameValueItem, NameValueList } from '../../_common';

// ----------------------------------------------------------------------

RelationshipAccess.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipAccess({ relationship }) {
  const { permission } = relationship;

  return (
    <Card>
      <CardHeader title="Data Access" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          {permission.map((permission) => (
            <>
              {relationship.relationshipStatus === 'Approved' && (
                <NameValueItem
                  icon={approved}
                  key={permission.permissionType}
                  name={permission.permissionType}
                  value={`approved on ${fDateFromLong(permission.approvedOn)}`}
                />
              )}
              {relationship.relationshipStatus === 'Invited' && (
                <NameValueItem
                  icon={invited}
                  key={permission.permissionType}
                  name={permission.permissionType}
                  value={`requested on ${fDateFromLong(permission.requestedOn)}`}
                />
              )}
            </>
          ))}
        </NameValueList>
      </CardContent>
    </Card>
  );
}
