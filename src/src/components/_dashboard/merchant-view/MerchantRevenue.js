// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// Demo data
import { demoData } from '../../../utils/demo-data/MerchantRevenue';

// ----------------------------------------------------------------------

export default function MerchantRevenue() {
  const theme = useTheme();

  return (
    <MerchantDashboardSnapshot
      title="Revenue"
      snapshot={demoData}
      navigateTo={PATH_DASHBOARD.analytics.bankingRecentTransactions}
      graphColor={theme.palette.secondary.main}
    />
  );
}
