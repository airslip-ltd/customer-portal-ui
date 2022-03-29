import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getMyDetails } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import ProfileEditForm from '../../components/_dashboard/user/ProfileEditForm';

// ----------------------------------------------------------------------

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.profile.view}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Profile"
      spaceHref={PATH_DASHBOARD.profile.view}
      activity="Edit Profile"
      heading="Edit Profile"
      actions={<EditActions />}
    >
      {profile.complete && <ProfileEditForm currentUser={profile.response.currentVersion} />}
    </StandardPage>
  );
}
