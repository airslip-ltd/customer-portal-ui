import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCashflowByYear } from '../../../redux/slices/analytics';

// ----------------------------------------------------------------------

export default function MerchantSalesAndRefunds() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2022);
  const { cashflowStats } = useSelector((state) => state.analytics);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getCashflowByYear(year));
  }, [dispatch, year]);

  const handleChangeYear = (year) => {
    setYear(year);
  };

  return (
    <MerchantDashboardSeries
      title="Cashflow"
      currentYear={year}
      years={[2022, 2021]}
      stats={cashflowStats}
      onYearChange={handleChangeYear}
      colors={[
        theme.palette.primary.main,
        theme.palette.chart.green[0],
        theme.palette.chart.red[0],
        theme.palette.chart.yellow[0]
      ]}
    />
  );
}
