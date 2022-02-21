import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import DemoNumberSnapshot from './DemoNumberSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// demo-data
import { demoData } from '../../../utils/demo-data/DebtServiceCoverageRatio';

// ----------------------------------------------------------------------
DebtServiceCoverageRatio.propTypes = {
  accountId: PropTypes.string
};
export default function DebtServiceCoverageRatio({ accountId }) {
  const [metricData, setMetricData] = useState({});
  accountId = accountId || '';

  useEffect(() => {
    if (!demoData[accountId] || !demoData[accountId].metrics) return;
    setMetricData(demoData[accountId]);
  }, [demoData, accountId, setMetricData]);

  return (
    <DemoNumberSnapshot
      title="Debt-Service Coverage Ratio (DSCR)"
      metricData={metricData}
      navigateTo={PATH_DASHBOARD.analytics.debtServiceCoverageRatioDetail}
    />
  );
}
