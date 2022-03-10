// material
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { PartnerCreateForm } from '../../components/_dashboard/partner';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function PartnerCreate() {
  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.partner.list}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Partners"
      spaceHref={PATH_DASHBOARD.partner.list}
      activity="New Partner"
      heading="Create a New Partner"
      actions={<EditActions />}
    >
      <PartnerCreateForm />
    </StandardPage>
  );
}
