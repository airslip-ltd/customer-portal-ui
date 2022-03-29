import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getMyDetails } from '../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { PartnerProfileEditForm } from '../../components/_dashboard/partner';

// ----------------------------------------------------------------------

export default function PartnerProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.partner.profile.view}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Profile"
      spaceHref={PATH_DASHBOARD.partner.profile.view}
      activity="Edit Details"
      heading="Edit Details"
      actions={<EditActions />}
    >
      {profile.complete && <PartnerProfileEditForm currentRecord={profile.response.currentVersion} />}
    </StandardPage>
  );
}
