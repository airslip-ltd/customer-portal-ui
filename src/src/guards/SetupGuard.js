import { useEffect } from 'react';
import PropTypes from 'prop-types';
// hooks
import useMemberDetails from '../hooks/useMemberDetails';
import SetupIntegration from '../pages/setup/SetupIntegration';

// ----------------------------------------------------------------------

SetupGuard.propTypes = {
  children: PropTypes.node
};

export default function SetupGuard({ children }) {
  const { setupInProgress } = useMemberDetails();

  useEffect(() => {
    console.log(setupInProgress);
  }, [setupInProgress]);

  return <>{setupInProgress ? <SetupIntegration /> : children}</>;
}
