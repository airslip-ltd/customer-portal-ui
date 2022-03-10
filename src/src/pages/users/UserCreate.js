import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserEdit() {
  const EditActions = () => (
    <Button size="medium" variant="contained" component={RouterLink} to={`${PATH_DASHBOARD.user.list}`} sx={{ mt: 1 }}>
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Users"
      spaceHref={PATH_DASHBOARD.user.list}
      activity="New User"
      heading="Create a New User"
      actions={<EditActions />}
    >
      <UserNewForm isEdit={false} />
    </StandardPage>
  );
}
