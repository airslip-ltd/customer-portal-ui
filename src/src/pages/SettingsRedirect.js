import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

export default function SettingsRedirect() {
  const { user } = useAuth();

  switch (user.airslipUserType) {
    case 'Partner':
      return <Navigate to={PATH_DASHBOARD.partner.profile.view} />;
    default:
      return <Navigate to="/401" />;
  }
}
