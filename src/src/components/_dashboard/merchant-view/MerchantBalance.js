import { useEffect, useState } from 'react';
// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// material
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCurrentBalance } from '../../../redux/slices/analytics';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function MerchantBalance() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentBalance } = useSelector((state) => state.analytics);
  const [metricData, setMetricData] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(getCurrentBalance());
  }, [dispatch]);

  useEffect(() => {
    if (!currentBalance.metrics) return;
    setMetricData(currentBalance);
    const newData = currentBalance.metrics.map((metric) => metric.balance);
    setChartData(newData);
  }, [currentBalance, setChartData, setMetricData]);

  return (
    <MerchantDashboardSnapshot
      title="Cash in bank"
      metricData={metricData}
      navigateTo={PATH_DASHBOARD.analytics.accountBalances}
      chartData={chartData}
      graphColor={theme.palette.chart.red[0]}
    />
  );
}
