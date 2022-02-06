import { useEffect } from 'react';
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
import { BankSummary } from '../../components/_dashboard/account-list';
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
  const { balanceSummary } = useSelector((state) => state.balances);

  useEffect(() => {
    dispatch(getBalanceSummary());
  }, [dispatch]);

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
        </Grid>

        {balanceSummary.balances && (
          <Card>
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
                      Updated On
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balanceSummary.balances.map((row) => {
                    const { institutionId, accountNumber, sortCode, balance, updatedOn } = row;

                    return (
                      <TableRow hover key={institutionId} tabIndex={-1}>
                        <TableCell component="th" scope="row" padding="none">
                          <BankSummary institutionId={institutionId} />
                        </TableCell>
                        <TableCell>{accountNumber}</TableCell>
                        <TableCell>{sortCode}</TableCell>
                        <TableCell>{balance}</TableCell>
                        <TableCell>{updatedOn}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Container>
    </Page>
  );
}
