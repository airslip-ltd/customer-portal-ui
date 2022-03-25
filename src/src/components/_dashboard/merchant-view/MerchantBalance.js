// import { useEffect } from 'react';
// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// material
// redux
// import { useDispatch, useSelector } from '../../../redux/store';
// import { getCurrentBalance } from '../../../redux/slices/analytics';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// Demo data
import { demoData } from '../../../utils/demo-data/CashInBank';

// ----------------------------------------------------------------------

export default function MerchantBalance() {
  const theme = useTheme();
  // const dispatch = useDispatch();

  // if (process.env.REACT_APP_ENVIRONMENT === 'demo') {

  // } else {

  // }

  // const { currentBalance } = useSelector((state) => state.analytics);

  // useEffect(() => {
  //   dispatch(getCurrentBalance());
  // }, [dispatch]);

  return (
    <MerchantDashboardSnapshot
      title="Cash in bank"
      snapshot={demoData}
      navigateTo={PATH_DASHBOARD.analytics.accountBalances}
      graphColor={theme.palette.chart.red[0]}
    />
  );
}
