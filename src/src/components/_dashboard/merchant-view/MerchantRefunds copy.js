import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRefundShapshot } from '../../../redux/slices/analytics';
// utils
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

MerchantRefunds.propTypes = {
  accountId: PropTypes.string
};
export default function MerchantRefunds({ accountId }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { refundStats } = useSelector((state) => state.analytics);
  const [metricData, setMetricData] = useState({});
  const [chartData, setChartData] = useState([]);
  accountId = accountId || '';

  useEffect(() => {
    dispatch(getRefundShapshot(30, accountId));
  }, [dispatch, accountId]);

  useEffect(() => {
    if (!refundStats[accountId] || !refundStats[accountId].metrics) return;
    setMetricData(refundStats[accountId]);
    const newData = refundStats[accountId].metrics.map((metric) => metric.balance);
    setChartData(newData);
  }, [refundStats, accountId, setChartData, setMetricData]);

  return (
    <MerchantDashboardSnapshot
      title="Refunds"
      metricData={metricData}
      chartData={chartData}
      navigateTo={PATH_DASHBOARD.analytics.commerceSummary}
      graphColor={theme.palette.secondary.main}
    />
  );
}
