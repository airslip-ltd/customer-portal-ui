import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search, reset } from '../../redux/slices/consent';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { columns } from '../../lists/consent-list';
import StandardList from '../../components/_common/Lists/StandardList';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function ConsentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { consent } = useSelector((state) => state.consent);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(search(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.consent.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Data Consents"
      spaceHref={PATH_DASHBOARD.consent.list}
      activity="List"
      heading="Data Consents"
      fullWidth
    >
      <StandardList
        columns={columns}
        details={consent}
        onChangeQuery={setQuery}
        onRowSelected={handleRowClick}
        recordsPerPage={10}
      />
    </StandardPage>
  );
}
