import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search as integrationSearch, reset } from '../../redux/slices/integration';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/integration-list';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function IntegrationList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { integration } = useSelector((state) => state.integration);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(integrationSearch(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.integrations.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  return (
    <>
      <Page title="Connected Services | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Connected Services"
            links={[
              { name: 'Services', href: PATH_DASHBOARD.root },
              { name: 'Your Services', href: PATH_DASHBOARD.integrations.root },
              { name: 'List' }
            ]}
          />
          <StandardList
            columns={columns}
            details={integration}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            recordsPerPage={10}
          />
        </Container>
      </Page>
    </>
  );
}
