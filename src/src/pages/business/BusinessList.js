import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/business';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/business-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function BusinessList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { business } = useSelector((state) => state.business);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.business.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  const handleAddClick = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.business.create}`);
    });
  }, [navigate, dispatch]);

  const ViewActions = () => (
    <Button size="medium" variant="contained" onClick={handleAddClick} sx={{ mt: 1 }}>
      Add a Business
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Businesss"
      spaceHref={PATH_DASHBOARD.business.list}
      activity="List"
      heading="Businesss"
      actions={<ViewActions />}
      fullWidth
    >
      <StandardList
        columns={columns}
        details={business}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
