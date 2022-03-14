import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Link, CardHeader, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

RelationshipReports.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipReports({ relationship }) {
  const { related } = relationship;

  console.log(relationship);

  return (
    <Card>
      <CardHeader title="Reports" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="column" spacing={1}>
          <Link
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.bankTransactions}/${related.airslipUserType}/${related.entityId}`}
          >
            Banking transaction
          </Link>
          <Link
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.commerceTransactions}/${related.airslipUserType}/${related.entityId}`}
          >
            Commerce transaction
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
