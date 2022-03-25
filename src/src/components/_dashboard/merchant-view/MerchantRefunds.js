// utils
import { useTheme } from '@mui/material/styles';
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// Demo data
import { demoData } from '../../../utils/demo-data/MerchantRefunds';

// ----------------------------------------------------------------------

export default function MerchantRefunds() {
  const theme = useTheme();

  return (
    <MerchantDashboardSnapshot
      title="Refunds"
      snapshot={demoData}
      navigateTo={PATH_DASHBOARD.analytics.commerceSummary}
      graphColor={theme.palette.secondary.main}
    />
  );
}
