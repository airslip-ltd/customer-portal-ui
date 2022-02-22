import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getSalesShapshot } from '../../../redux/slices/analytics';
// utils
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------
MerchantRevenue.propTypes = {
  accountId: PropTypes.string
};
export default function MerchantRevenue({ accountId }) {
  const dispatch = useDispatch();
  const { salesStats } = useSelector((state) => state.analytics);
  const [metricData, setMetricData] = useState({});
  const [chartData, setChartData] = useState([]);
  accountId = accountId || '';

  useEffect(() => {
    dispatch(getSalesShapshot(30, accountId));
  }, [dispatch, accountId]);

  useEffect(() => {
    if (!salesStats[accountId] || !salesStats[accountId].metrics) return;
    setMetricData(salesStats[accountId]);
    const newData = salesStats[accountId].metrics.map((metric) => metric.balance);
    setChartData(newData);
  }, [salesStats, accountId, setChartData, setMetricData]);

  return (
    <MerchantDashboardSnapshot
      title="Revenue"
      metricData={metricData}
      navigateTo={PATH_DASHBOARD.analytics.commerceSummary}
      chartData={chartData}
    />
  );
}
