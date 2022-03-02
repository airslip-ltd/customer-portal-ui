import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useMemberDetails from '../hooks/useMemberDetails';
import useAuth from '../hooks/useAuth';
// routes
import { PATH_ONBOARDING } from '../routes/paths';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

SetupGuard.propTypes = {
  children: PropTypes.node
};

export default function SetupGuard({ children }) {
  const { setupInProgress } = useMemberDetails();
  const { isInitialized } = useAuth();

  if (!isInitialized) return <LoadingScreen />;

  if (setupInProgress) {
    return <Navigate to={PATH_ONBOARDING.integrate} />;
  }

  return <>{children}</>;
}
