import MerchantDashboardSeries from './MerchantDashboardSeries';

import { chartDataSummary } from '../../../utils/demo-data/RevenueGrowthBenchmarking';

import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------
export default function RevenueGrowthBenchmarking() {
  return (
    <MerchantDashboardSeries
      title="Revenue Benchmarking"
      stats={chartDataSummary}
      chartType="line"
      navigateTo={PATH_DASHBOARD.analytics.revenueBenchmarkingDetail}
    />
  );
}
