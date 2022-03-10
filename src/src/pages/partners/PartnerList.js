import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/partner';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/partner-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function PartnerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partner } = useSelector((state) => state.partner);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.partner.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  const handleAddClick = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.partner.create}`);
    });
  }, [navigate, dispatch]);

  const ViewActions = () => (
    <Button size="medium" variant="contained" onClick={handleAddClick} sx={{ mt: 1 }}>
      Add a Partner
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Partners"
      spaceHref={PATH_DASHBOARD.partner.list}
      activity="List"
      heading="Partners"
      actions={<ViewActions />}
      fullWidth
    >
      <StandardList
        columns={columns}
        details={partner}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
