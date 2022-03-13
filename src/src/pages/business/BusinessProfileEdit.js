import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getMyDetails } from '../../redux/slices/business';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { BusinessProfileEditForm } from '../../components/_dashboard/business';

// ----------------------------------------------------------------------

export default function BusinessProfileEdit() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.business);

  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.business.profile.view}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Profile"
      spaceHref={PATH_DASHBOARD.business.profile.view}
      activity="Edit Details"
      heading="Edit Details"
      actions={<EditActions />}
    >
      {profile.hasData && <BusinessProfileEditForm currentRecord={profile.response.currentVersion} />}
    </StandardPage>
  );
}
