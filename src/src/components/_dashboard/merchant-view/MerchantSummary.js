// material
import { Grid } from '@mui/material';
import { DateSelectionProvider, CurrencySelectionProvider } from '../../../contexts';
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
    <CurrencySelectionProvider>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="commerce" title="Revenue (Last 30 days)">
            <MerchantRevenue />
          </RequiredServiceGuard>
        </Grid>

        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="commerce" title="Refunds (Last 30 days)">
            <MerchantRefunds />
          </RequiredServiceGuard>
        </Grid>

        <Grid item xs={12} md={4}>
          <RequiredServiceGuard requiredService="banking" title="Bank Balance">
            <MerchantBalance />
          </RequiredServiceGuard>
        </Grid>
      </Grid>

      <DateSelectionProvider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RequiredServiceGuard requiredService="banking" title="Bank Cashflow">
              <CashflowByAccount />
            </RequiredServiceGuard>
          </Grid>

          <Grid item xs={12} md={6}>
            <RequiredServiceGuard requiredService="commerce" title="Commerce Sales Performance">
              <MerchantSalesAndRefunds />
            </RequiredServiceGuard>
          </Grid>
        </Grid>
      </DateSelectionProvider>
    </CurrencySelectionProvider>
  );
}
