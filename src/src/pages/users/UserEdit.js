import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { get } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserEdit() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.user.view}/${id}`}
      sx={{ mt: 1 }}
    >
      Cancel
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Users"
      spaceHref={PATH_DASHBOARD.user.list}
      activity={current.complete ? current.response.currentVersion.displayName : id}
      heading={current.complete ? current.response.currentVersion.displayName : id}
      actions={<EditActions />}
    >
      {current.complete && <UserNewForm isEdit currentUser={current.response.currentVersion} />}
    </StandardPage>
  );
}
