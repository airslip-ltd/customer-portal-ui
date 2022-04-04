import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import DemoNumberSnapshot from './DemoNumberSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// demo-data
import { demoData } from '../../../utils/demo-data/AverageCreditorDays';

// ----------------------------------------------------------------------
AverageCreditorDays.propTypes = {
  accountId: PropTypes.string
};
export default function AverageCreditorDays({ accountId }) {
  const [metricData, setMetricData] = useState({});
  accountId = accountId || '';

  useEffect(() => {
    if (!demoData[accountId] || !demoData[accountId].metrics) return;
    setMetricData(demoData[accountId]);
  }, [accountId, setMetricData]);

  return (
    <DemoNumberSnapshot
      title="Average Creditor Days"
      metricData={metricData}
      navigateTo={`${PATH_DASHBOARD.analytics.debtServiceCoverageRatioDetail}/${accountId}`}
    />
  );
}
