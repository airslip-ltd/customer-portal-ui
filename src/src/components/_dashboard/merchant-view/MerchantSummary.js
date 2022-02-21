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
  BankingRecentTransactions,
  CashInflowOutflow,
  RevenueGrowthBenchmarking,
  NewVsReturningCustomers,
  DebtServiceCoverageRatio,
  LeverageRatio,
  DebtRatio,
  DebtToCapitalRatio,
  TotalDebtToTotalAssetsRatio,
  OperatingMargin,
  GrossProfitMargin,
  CommonOutgoings,
  LargestCustomersByRevenue,
  ActiveVsChurnCustomers,
  RefundRateVsBenchmark,
  AccountsReceivables,
  AccountsPayables,
  AverageDebtorDays,
  AverageCreditorDays,
  LateInvoicesReceived,
  LateBillsPaid,
  RevenueForecasts
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

        {featureEnabled('demo') && (
          <Grid item xs={12} md={4}>
            <DebtServiceCoverageRatio accountId="my-account-1" />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <DebtRatio />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <DebtToCapitalRatio />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <RevenueGrowthBenchmarking />
          </Grid>
        )}

        {featureEnabled('demo') && (
          <Grid item xs={12} md={4}>
            <NewVsReturningCustomers accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo') && (
          <Grid item xs={12} md={8}>
            <CashInflowOutflow />
          </Grid>
        )}
        {featureEnabled('banking-recent-transactions') && (
          <Grid item xs={12}>
            <BankingRecentTransactions />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LeverageRatio />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <TotalDebtToTotalAssetsRatio />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <OperatingMargin />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <GrossProfitMargin />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <CommonOutgoings />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LargestCustomersByRevenue />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <ActiveVsChurnCustomers />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <RefundRateVsBenchmark />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AccountsReceivables />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AccountsPayables />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AverageDebtorDays />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AverageCreditorDays />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LateInvoicesReceived />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LateBillsPaid />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={8}>
            <RevenueForecasts />
          </Grid>
        )}

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
      </Grid>
    );
  }
  return <Grid container spacing={3} />;
}
