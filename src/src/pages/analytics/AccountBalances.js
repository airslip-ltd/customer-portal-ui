import { useState, useCallback } from 'react';
// components
import { Card, Container, Grid } from '@mui/material';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { StandardListClientNoCard } from '../../components/_common/Lists';
import { RecentBankTransactions, CashflowByAccount } from '../../components/_dashboard/merchant-view';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// demo data
import { listData } from '../../utils/demo-data/AccountBalances';
import { columns } from '../../lists/account-balances';

// ----------------------------------------------------------------------

export default function CommerceSummary() {
  const { themeStretch } = useSettings();
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleRowClick = useCallback(
    (params) => {
      setSelectedAccount(params.id);
    },
    [setSelectedAccount]
  );

  return (
    <Page title="Analytics | Balances | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Account Balances"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
            { name: 'Account Balances' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Card sx={{ pt: 1 }}>
              <StandardListClientNoCard
                columns={columns}
                details={listData}
                recordsPerPage={12}
                onRowSelected={handleRowClick}
              />
            </Card>
          </Grid>

          {selectedAccount && (
            <Grid item xs={12}>
              <CashflowByAccount accountId={selectedAccount} />
            </Grid>
          )}

          {selectedAccount && (
            <Grid item xs={12}>
              <RecentBankTransactions accountId={selectedAccount} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
