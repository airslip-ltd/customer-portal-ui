import { useState, useEffect, useCallback } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAccounts } from '../../redux/slices/accounts';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/account-list';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function IntegrationList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(getAccounts(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Accounts | List | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Bank Accounts"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Bank Accounts', href: PATH_DASHBOARD.accounts.root },
              { name: 'List' }
            ]}
          />
          <StandardList
            columns={columns}
            details={accounts}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            recordsPerPage={10}
          />
        </Container>
      </Page>
    </>
  );
}
