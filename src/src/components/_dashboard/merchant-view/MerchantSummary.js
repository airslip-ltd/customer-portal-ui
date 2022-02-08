import { isUndefined } from 'lodash-es';
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
// components
import {
  MerchantRevenue,
  MerchantRefunds,
  MerchantInterestCharges,
  MerchantSalesAndRefunds,
  MerchantCashflow,
  BankingRecentTransactions
} from '.';

// ----------------------------------------------------------------------

MerchantSummary.propTypes = {
  currentMerchant: PropTypes.object
};

export default function MerchantSummary({ currentMerchant }) {
  if (!isUndefined(currentMerchant)) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MerchantRevenue />
        </Grid>

        <Grid item xs={12} md={4}>
          <MerchantRefunds />
        </Grid>

        <Grid item xs={12} md={4}>
          <MerchantInterestCharges />
        </Grid>

        <Grid item xs={12}>
          <MerchantSalesAndRefunds />
        </Grid>

        <Grid item xs={12}>
          <MerchantCashflow />
        </Grid>

        <Grid item xs={12}>
          <BankingRecentTransactions />
        </Grid>
      </Grid>
    );
  }
  return <Grid container spacing={3} />;
}
