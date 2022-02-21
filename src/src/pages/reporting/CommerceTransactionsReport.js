import { useState, useEffect, useCallback } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCommerceTransactions } from '../../redux/slices/reports';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/commerce-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function BankingTransactionsReport() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { commerceTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(getCommerceTransactions(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Reports | Commerce Transactions | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Commerce Transactions"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Reports', href: PATH_DASHBOARD.reports.root },
              { name: 'Commerce Transactions' }
            ]}
          />
          <StandardList
            columns={columns}
            details={commerceTransactions}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            recordsPerPage={10}
            defaultSort="datetime"
          />
        </Container>
      </Page>
    </>
  );
}
