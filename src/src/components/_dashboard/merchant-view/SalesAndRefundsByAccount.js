import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
import { revenueByAccount } from '../../../utils/demo-data/CommerceSummary';

// ----------------------------------------------------------------------
SalesAndRefundsByAccount.propTypes = {
  accountId: PropTypes.string
};

export default function SalesAndRefundsByAccount({ accountId }) {
  const [year, setYear] = useState(2022);
  const [renderStats, setRenderStats] = useState({});

  accountId = accountId || '';

  useEffect(() => {
    setRenderStats(revenueByAccount[accountId].find((element) => element.year === year));
  }, [year]);

  const handleChangeYear = (year) => {
    setYear(year);
  };

  return (
    <MerchantDashboardSeries
      title="Revenue and Refunds"
      currentYear={year}
      years={[2022, 2021]}
      stats={renderStats}
      onYearChange={handleChangeYear}
    />
  );
}
