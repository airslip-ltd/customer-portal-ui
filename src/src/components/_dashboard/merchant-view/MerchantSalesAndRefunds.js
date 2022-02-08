import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenueByYear } from '../../../redux/slices/analytics';

// ----------------------------------------------------------------------
MerchantSalesAndRefunds.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantSalesAndRefunds({ accountId }) {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2022);
  const [renderStats, setRenderStats] = useState({});
  const { revenueStats } = useSelector((state) => state.analytics);

  accountId = accountId || '';

  useEffect(() => {
    dispatch(getRevenueByYear(year, accountId));
  }, [dispatch, year, accountId]);

  useEffect(() => {
    if (!revenueStats[accountId]) return;
    setRenderStats(revenueStats[accountId]);
  }, [accountId, revenueStats, setRenderStats]);

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
