import { isUndefined } from 'lodash-es';
import PropTypes from 'prop-types';
// material
import { Grid, Typography } from '@mui/material';

// utils
import { featureEnabled } from '../../../utils/feature-switch';

// components
import {
  MerchantRevenue,
  MerchantBalance,
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
  RevenueForecasts,
  BankingExpensesCategories,
  Customers
} from '.';

// ----------------------------------------------------------------------

MerchantSummaryDemo.propTypes = {
  currentMerchant: PropTypes.object,
  accountId: PropTypes.string
};

export default function MerchantSummaryDemo({ currentMerchant, accountId }) {
  accountId = accountId ?? 'my-account-4';

  if (!isUndefined(currentMerchant)) {
    return (
      <Grid container spacing={3}>
        {featureEnabled('demo') && (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">Leverage</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <DebtServiceCoverageRatio accountId={accountId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DebtRatio accountId={accountId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DebtToCapitalRatio accountId={accountId} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Liquidity</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <CashInflowOutflow accountId="my-account-1" />
            </Grid>

            {accountId === 'my-account-1' && featureEnabled('demo') && (
              <Grid item xs={12} md={4}>
                <Customers />
              </Grid>
            )}
          </>
        )}

        {featureEnabled('demo') && (
          <>
            <Grid item xs={12} md={4}>
              <AverageDebtorDays accountId="my-account-1" />
            </Grid>
            <Grid item xs={12} md={4}>
              <AverageCreditorDays accountId="my-account-1" />
            </Grid>

            <Grid item xs={12} md={4}>
              <MerchantRevenue />
            </Grid>
            <Grid item xs={12} md={4}>
              <MerchantBalance />
            </Grid>
          </>
        )}

        {featureEnabled('demo') && (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">Profitability</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <OperatingMargin accountId="my-account-1" />
            </Grid>
          </>
        )}
        {featureEnabled('demo') && (
          <Grid item xs={12} md={4}>
            <GrossProfitMargin accountId="my-account-1" />
          </Grid>
        )}

        {featureEnabled('demo') && (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">Growth Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <RevenueGrowthBenchmarking accountId="my-account-1" />
            </Grid>

            <Grid item xs={12} md={4}>
              <NewVsReturningCustomers accountId="my-account-1" />
            </Grid>
            <Grid item xs={12} md={4}>
              <ActiveVsChurnCustomers accountId="my-account-1" />
            </Grid>
          </>
        )}
        {featureEnabled('demo') && (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">Outgoings</Typography>
            </Grid>
            <Grid item xs={8}>
              <BankingExpensesCategories />
            </Grid>
          </>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LeverageRatio accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <TotalDebtToTotalAssetsRatio accountId="my-account-1" />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <CommonOutgoings accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LargestCustomersByRevenue accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <ActiveVsChurnCustomers accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <RefundRateVsBenchmark accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AccountsReceivables accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <AccountsPayables accountId="my-account-1" />
          </Grid>
        )}

        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LateInvoicesReceived accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={4}>
            <LateBillsPaid accountId="my-account-1" />
          </Grid>
        )}
        {featureEnabled('demo-to-complete') && (
          <Grid item xs={12} md={8}>
            <RevenueForecasts accountId="my-account-1" />
          </Grid>
        )}
      </Grid>
    );
  }
  return <Grid container spacing={3} />;
}
