import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCashflowByYear } from '../../../redux/slices/analytics';

// ----------------------------------------------------------------------
MerchantCashflow.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantCashflow({ accountId }) {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2022);
  const [renderStats, setRenderStats] = useState({});
  const { cashflowStats } = useSelector((state) => state.analytics);
  const theme = useTheme();

  accountId = accountId || '';

  useEffect(() => {
    dispatch(getCashflowByYear(year, accountId));
  }, [dispatch, year, accountId]);

  useEffect(() => {
    const myStats = cashflowStats.filter((item) => item.accountId === accountId);
    if (myStats.length > 0) {
      const theStats = myStats[0];
      setRenderStats(theStats.data);
    }
  }, [accountId, cashflowStats, setRenderStats]);

  const handleChangeYear = (year) => {
    setYear(year);
  };

  return (
    <MerchantDashboardSeries
      title="Cashflow"
      currentYear={year}
      years={[2022, 2021]}
      stats={renderStats}
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
