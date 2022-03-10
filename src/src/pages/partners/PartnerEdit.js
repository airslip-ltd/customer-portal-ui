import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { get } from '../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { PartnerEditForm } from '../../components/_dashboard/partner';

// ----------------------------------------------------------------------

export default function PartnerEdit() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.partner);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const EditActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.partner.view}/${id}`}
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
      activity={current.hasData ? current.response.currentVersion.name : id}
      heading={current.hasData ? current.response.currentVersion.name : id}
      actions={<EditActions />}
    >
      {current.hasData && <PartnerEditForm isEdit currentRecord={current.response.currentVersion} />}
    </StandardPage>
  );
}
