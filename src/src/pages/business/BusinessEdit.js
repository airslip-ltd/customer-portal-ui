import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { get } from '../../redux/slices/business';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { BusinessEditForm } from '../../components/_dashboard/business';

// ----------------------------------------------------------------------

export default function BusinessEdit() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.business);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.business.view}/${id}`}
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
      activity={current.complete ? current.response.currentVersion.name : id}
      heading={current.complete ? current.response.currentVersion.name : id}
      actions={<EditActions />}
    >
      {current.complete && <BusinessEditForm isEdit currentRecord={current.response.currentVersion} />}
    </StandardPage>
  );
}
