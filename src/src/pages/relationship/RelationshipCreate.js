// material
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { RelationshipCreateForm } from '../../components/_dashboard/relationship';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function PartnerCreate() {
  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.relationship.list}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Relationships"
      spaceHref={PATH_DASHBOARD.relationship.list}
      activity="New Relationship"
      heading="Create a New Relationship"
      actions={<EditActions />}
    >
      <RelationshipCreateForm />
    </StandardPage>
  );
}
