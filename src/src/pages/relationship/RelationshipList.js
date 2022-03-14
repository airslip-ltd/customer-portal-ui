import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/relationship';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/relationship-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function RelationshipList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { relationship } = useSelector((state) => state.relationship);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.relationship.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  const handleAddClick = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.relationship.create}`);
    });
  }, [navigate, dispatch]);

  const ViewActions = () => (
    <Button size="medium" variant="contained" onClick={handleAddClick} sx={{ mt: 1 }}>
      Add a Relationship
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Relationships"
      spaceHref={PATH_DASHBOARD.relationship.list}
      activity="List"
      heading="Relationships"
      actions={<ViewActions />}
      fullWidth
    >
      <StandardList
        columns={columns}
        details={relationship}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
