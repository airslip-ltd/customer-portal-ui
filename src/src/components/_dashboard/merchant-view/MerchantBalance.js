import { useEffect, useState } from 'react';
// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// Demo data
import { demoData } from '../../../utils/demo-data/MerchantBalances';

// ----------------------------------------------------------------------

export default function MerchantBalance() {
  const theme = useTheme();

  const newData = demoData.metrics.map((metric) => metric.balance);

  return (
    <MerchantDashboardSnapshot
      title="Cash in bank"
      metricData={demoData}
      navigateTo={PATH_DASHBOARD.analytics.accountBalances}
      chartData={newData}
      graphColor={theme.palette.chart.red[0]}
    />
  );
}
