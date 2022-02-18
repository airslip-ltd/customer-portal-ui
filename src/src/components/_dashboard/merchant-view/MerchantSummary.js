import { isUndefined } from 'lodash-es';
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';

// utils
import { featureEnabled } from '../../../utils/feature-switch';

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

        {featureEnabled('banking-recent-transactions') && (
          <Grid item xs={12}>
            <BankingRecentTransactions />
          </Grid>
        )}
      </Grid>
    );
  }
  return <Grid container spacing={3} />;
}
