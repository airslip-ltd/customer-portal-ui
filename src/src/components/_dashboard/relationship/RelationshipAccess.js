import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkCircle from '@iconify/icons-ic/baseline-check-circle-outline';
// material
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import { fDateFromLong } from '../../../utils/formatDate';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

RelationshipAccess.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipAccess({ relationship }) {
  const { permission } = relationship;

  return (
    <Card>
      <CardHeader title="Data Access" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {permission.map((permission) => (
          <Stack key={permission.permissionType} direction="row">
            <IconStyle icon={checkCircle} />
            <Typography variant="body2">
              {permission.permissionType} &nbsp;
              {relationship.relationshipStatus === 'Approved' && (
                <Link variant="body2" color="text.primary">
                  approved on {fDateFromLong(permission.approvedOn)}
                </Link>
              )}
              {relationship.relationshipStatus === 'Invited' && (
                <Link variant="body2" color="text.primary">
                  requested on {fDateFromLong(permission.approvedOn)}
                </Link>
              )}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
