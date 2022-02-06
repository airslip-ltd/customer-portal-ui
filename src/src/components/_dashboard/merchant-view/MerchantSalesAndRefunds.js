import { useEffect, useState } from 'react';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenueByYear } from '../../../redux/slices/analytics';

// ----------------------------------------------------------------------

export default function MerchantSalesAndRefunds() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2022);
  const { revenueStats } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getRevenueByYear(year));
  }, [dispatch, year]);

  const handleChangeYear = (year) => {
    setYear(year);
  };

  return (
    <MerchantDashboardSeries
      title="Revenue and Refunds"
      currentYear={year}
      years={[2022, 2021]}
      stats={revenueStats}
      onYearChange={handleChangeYear}
    />
  );
}
