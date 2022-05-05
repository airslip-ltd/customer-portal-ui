import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/apiKey';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/business-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function ApiKeyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { apikey } = useSelector((state) => state.apiKey);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.apiKey.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  const handleAddClick = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.apiKey.create}`);
    });
  }, [navigate, dispatch]);

  const ViewActions = () => (
    <Button size="medium" variant="contained" onClick={handleAddClick} sx={{ mt: 1 }}>
      Add an Api Key
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Api Keys"
      spaceHref={PATH_DASHBOARD.apiKey.list}
      activity="List"
      heading="Api Keys"
      actions={<ViewActions />}
      fullWidth
    >
      <StandardList
        columns={columns}
        details={apikey}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
