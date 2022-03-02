import { useEffect, useState } from 'react';
// components
import {
  Card,
  Container,
  Grid,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer
} from '@mui/material';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { ProviderImage } from '../../components/integrations';
import { CommerceRecentTransactions, MerchantSalesAndRefunds } from '../../components/_dashboard/merchant-view';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAccounts } from '../../redux/slices/transactions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// ----------------------------------------------------------------------

export default function CommerceSummary() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selectedAccount, setSelectedAccount] = useState('');
  const { accounts } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const handleSelectAccount = (id) => {
    setSelectedAccount(id);
  };

  return (
    <Page title="Analytics | Commerce | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Commerce Summary"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
            { name: 'Commerce Summary' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Something about commerce
            </Typography>
          </Grid>
          {accounts && (
            <Grid item xs={12}>
              <Card sx={{ pt: 1 }}>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell key="institutionId" align="left">
                          Provider
                        </TableCell>
                        <TableCell key="accountNumber" align="left">
                          Store Name
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accounts.map((row) => {
                        const { id, provider, name } = row;

                        return (
                          <TableRow
                            hover
                            selected={selectedAccount === id}
                            key={id}
                            tabIndex={-1}
                            onClick={() => handleSelectAccount(id)}
                          >
                            <TableCell component="th" scope="row" padding="none">
                              <ProviderImage icon={provider} />
                            </TableCell>
                            <TableCell>{name}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          )}

          {selectedAccount && (
            <Grid item xs={12}>
              <MerchantSalesAndRefunds accountId={selectedAccount} />
            </Grid>
          )}

          {selectedAccount && (
            <Grid item xs={12}>
              <CommerceRecentTransactions accountId={selectedAccount} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
