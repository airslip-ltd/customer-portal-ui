import { useState, useEffect, useCallback } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankTransactions } from '../../redux/slices/reports';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/bank-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function BankingTransactionsReport() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { bankTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(getBankTransactions(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Reports | Bank Transactions | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Bank Transactions"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Reports', href: PATH_DASHBOARD.reports.root },
              { name: 'Bank Transactions' }
            ]}
          />
          <StandardList
            columns={columns}
            details={bankTransactions}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            recordsPerPage={10}
          />
        </Container>
      </Page>
    </>
  );
}
