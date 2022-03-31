// material
import { Grid } from '@mui/material';
import { DateSelectionProvider } from '../../../contexts';
// components
import { MerchantRevenue, MerchantRefunds, MerchantBalance, CashflowByAccount, MerchantSalesAndRefunds } from '.';

// ----------------------------------------------------------------------

export default function MerchantSummary() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MerchantRevenue />
        </Grid>

        <Grid item xs={12} md={4}>
          <MerchantRefunds />
        </Grid>

        <Grid item xs={12} md={4}>
          <MerchantBalance />
        </Grid>
      </Grid>

      <DateSelectionProvider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CashflowByAccount />
          </Grid>

          <Grid item xs={12} md={6}>
            <MerchantSalesAndRefunds />
          </Grid>
        </Grid>
      </DateSelectionProvider>
    </>
  );
}
