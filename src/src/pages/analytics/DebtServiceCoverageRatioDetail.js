import { useCallback } from 'react';
// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/debt-service-coverage-ratio-list';
import { listData } from '../../utils/demo-data/DebtServiceCoverageRatio';
import StandardListClient from '../../components/_common/Lists/StandardListClient';

// ----------------------------------------------------------------------

export default function BankingTransactionsReport() {
  const { themeStretch } = useSettings();

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Reports | Bank Transactions | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Debt Service Coverage Ratio"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
              { name: 'Debt Service Coverage Ratio' }
            ]}
          />
          <StandardListClient columns={columns} details={listData} onRowSelected={handleRowClick} recordsPerPage={10} />
        </Container>
      </Page>
    </>
  );
}
