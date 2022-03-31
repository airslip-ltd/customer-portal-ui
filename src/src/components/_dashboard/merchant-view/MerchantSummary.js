// material
import { Grid } from '@mui/material';
import { DateSelectionProvider } from '../../../contexts';
// components
import {
  MerchantRevenue,
  MerchantRefunds,
  MerchantBalance,
  CashflowByAccount,
  MerchantSalesAndRefunds,
  RequiredServiceGuard
} from '.';

// ----------------------------------------------------------------------

export default function MerchantSummary() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="commerce" title="Revenue">
            <MerchantRevenue />
          </RequiredServiceGuard>
        </Grid>

        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="commerce" title="Refunds">
            <MerchantRefunds />
          </RequiredServiceGuard>
        </Grid>

        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="banking" title="Cash in bank">
            <MerchantBalance />
          </RequiredServiceGuard>
        </Grid>
      </Grid>

      <DateSelectionProvider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RequiredServiceGuard requiredService="banking" title="Cashflow">
              <CashflowByAccount />
            </RequiredServiceGuard>
          </Grid>

          <Grid item xs={12} md={6}>
            <RequiredServiceGuard requiredService="commerce" title="Revenue and Refunds">
              <MerchantSalesAndRefunds />
            </RequiredServiceGuard>
          </Grid>
        </Grid>
      </DateSelectionProvider>
    </>
  );
}
