import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/user-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.user.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  const handleAddClick = useCallback(() => {
    dispatch(reset()).then(() => {
      navigate(`${PATH_DASHBOARD.user.create}`);
    });
  }, [navigate, dispatch]);

  const ViewActions = () => (
    <Button size="medium" variant="contained" onClick={handleAddClick} sx={{ mt: 1 }}>
      Add a User
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Users"
      spaceHref={PATH_DASHBOARD.user.list}
      activity="List"
      heading="Users"
      actions={<ViewActions />}
      fullWidth
    >
      <StandardList
        columns={columns}
        details={user}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
