import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { get } from '../../redux/slices/relationship';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { RelationshipEditForm } from '../../components/_dashboard/relationship';

// ----------------------------------------------------------------------

export default function RelationshipEdit() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.relationship);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.relationship.view}/${id}`}
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
      activity={current.complete ? current.response.currentVersion.name : id}
      heading={current.complete ? current.response.currentVersion.name : id}
      actions={<EditActions />}
    >
      {current.complete && <RelationshipEditForm isEdit currentRecord={current.response.currentVersion} />}
    </StandardPage>
  );
}
