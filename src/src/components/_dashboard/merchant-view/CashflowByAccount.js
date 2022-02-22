import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
import { cashflowByAccount } from '../../../utils/demo-data/AccountBalances';

// ----------------------------------------------------------------------
CashflowByAccount.propTypes = {
  accountId: PropTypes.string
};

export default function CashflowByAccount({ accountId }) {
  const [year, setYear] = useState(2022);
  const [renderStats, setRenderStats] = useState({});

  accountId = accountId || '';

  useEffect(() => {
    setRenderStats(cashflowByAccount[accountId].find((element) => element.year === year));
  }, [year, accountId]);

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
    />
  );
}
