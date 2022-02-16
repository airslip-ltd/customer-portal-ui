import { useState, useEffect, useCallback } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getIntegrationList } from '../../redux/slices/integrations';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/integration-list';
import StandardList from './StandardList';

// ----------------------------------------------------------------------

export default function IntegrationList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { integrationList, isLoading } = useSelector((state) => state.integration);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(getIntegrationList(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Accounts | List | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Integrations List"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Integrations', href: PATH_DASHBOARD.integrations.root },
              { name: 'List' }
            ]}
          />
          <StandardList
            columns={columns}
            details={integrationList}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            loading={isLoading}
            recordsPerPage={10}
          />
        </Container>
      </Page>
    </>
  );
}
