import { useEffect } from 'react';
// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCurrentBalance } from '../../../redux/slices/analytics';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------

export default function MerchantBalance() {
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { currentBalance } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getCurrentBalance(dataOwnerQuery));
  }, [dispatch, dataOwnerQuery]);

  return (
    <MerchantDashboardSnapshot
      title="Cash in bank"
      snapshot={currentBalance}
      navigateTo={buildOwnedPath(PATH_DASHBOARD.analytics.accountBalances)}
      graphColor={theme.palette.chart.red[0]}
    />
  );
}
