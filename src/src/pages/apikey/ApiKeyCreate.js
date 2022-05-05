// material
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { ApiKeyCreateForm } from '../../components/_dashboard/apiKey';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function ApiKeyCreate() {
  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.apiKey.list}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Api Keys"
      spaceHref={PATH_DASHBOARD.apiKey.list}
      activity="New Api Key"
      heading="Create a New Api Key"
      actions={<EditActions />}
    >
      <ApiKeyCreateForm />
    </StandardPage>
  );
}
