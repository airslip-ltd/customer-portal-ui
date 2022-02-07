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
import getSymbolFromCurrency from 'currency-symbol-map';
import ReactTimeAgo from 'react-time-ago';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { BankSummary } from '../../components/_dashboard/account-list';
import { MerchantCashflow, MerchantRecentTransactions } from '../../components/_dashboard/merchant-view';
import { fCurrency } from '../../utils/formatNumber';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBalanceSummary } from '../../redux/slices/balances';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// ----------------------------------------------------------------------

export default function AccountBalances() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selectedAccount, setSelectedAccount] = useState('');
  const { balanceSummary } = useSelector((state) => state.balances);

  useEffect(() => {
    dispatch(getBalanceSummary());
  }, [dispatch]);

  const handleSelectAccount = (id) => {
    setSelectedAccount(id);
  };

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
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Something about balances
            </Typography>
          </Grid>
          {balanceSummary.balances && (
            <Grid item xs={12}>
              <Card sx={{ pt: 1 }}>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell key="institutionId" align="left">
                          Institution
                        </TableCell>
                        <TableCell key="accountNumber" align="left">
                          Account Number
                        </TableCell>
                        <TableCell key="sortCode" align="left">
                          Sort Code
                        </TableCell>
                        <TableCell key="balance" align="left">
                          Balance
                        </TableCell>
                        <TableCell key="updatedOn" align="left">
                          Last Updated
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {balanceSummary.balances.map((row) => {
                        const { id, institutionId, accountNumber, sortCode, balance, updatedOn, currencyCode } = row;

                        return (
                          <TableRow
                            hover
                            selected={selectedAccount === id}
                            key={id}
                            tabIndex={-1}
                            onClick={() => handleSelectAccount(id)}
                          >
                            <TableCell component="th" scope="row" padding="none">
                              <BankSummary institutionId={institutionId} />
                            </TableCell>
                            <TableCell>{accountNumber}</TableCell>
                            <TableCell>{sortCode}</TableCell>
                            <TableCell>
                              {getSymbolFromCurrency(currencyCode)}
                              {fCurrency(balance)}
                            </TableCell>
                            <TableCell>
                              <ReactTimeAgo date={updatedOn} locale="en-US" />
                            </TableCell>
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
              <MerchantCashflow accountId={selectedAccount} />
            </Grid>
          )}

          {selectedAccount && (
            <Grid item xs={12}>
              <MerchantRecentTransactions accountId={selectedAccount} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
