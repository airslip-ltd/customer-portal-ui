import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Button, CardHeader, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

RelationshipReports.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipReports({ relationship }) {
  const { related } = relationship;

  return (
    <Card>
      <CardHeader title="Reports" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="column" spacing={1}>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`${PATH_DASHBOARD.relationship.summary}/${relationship.id}/${related.airslipUserType}/${related.entityId}`}
          >
            Analytics summary
          </Button>
          <Button
            variant="outlined"
            disabled={relationship.permission.findIndex((perm) => perm.permissionType === 'Banking') < 0}
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.bankTransactions}/${relationship.id}/${related.airslipUserType}/${related.entityId}`}
          >
            Banking transactions
          </Button>
          <Button
            variant="outlined"
            disabled={relationship.permission.findIndex((perm) => perm.permissionType === 'Commerce') < 0}
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.commerceTransactions}/${relationship.id}/${related.airslipUserType}/${related.entityId}`}
          >
            Commerce transactions
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
