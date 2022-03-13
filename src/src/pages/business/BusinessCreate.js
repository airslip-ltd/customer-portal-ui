// material
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { BusinessCreateForm } from '../../components/_dashboard/business';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function BusinessCreate() {
  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.business.list}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Businesss"
      spaceHref={PATH_DASHBOARD.business.list}
      activity="New Business"
      heading="Create a New Business"
      actions={<EditActions />}
    >
      <BusinessCreateForm />
    </StandardPage>
  );
}
