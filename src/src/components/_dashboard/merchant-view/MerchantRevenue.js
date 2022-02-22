// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// Demo data
import { demoData } from '../../../utils/demo-data/MerchantRevenue';

// ----------------------------------------------------------------------

export default function MerchantRevenue() {
  const theme = useTheme();

  const newData = demoData.metrics.map((metric) => metric.balance);

  return (
    <MerchantDashboardSnapshot
      title="Revenue"
      metricData={demoData}
      navigateTo={PATH_DASHBOARD.analytics.commerceSummary}
      chartData={newData}
      graphColor={theme.palette.secondary.main}
    />
  );
}
