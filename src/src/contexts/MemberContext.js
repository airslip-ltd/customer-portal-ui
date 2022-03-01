import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
// material
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  setupComplete: false,
  setupInProgress: false,
  onCompleteSetup: () => {}
};

const MemberContext = createContext({
  ...initialState
});

MemberProvider.propTypes = {
  children: PropTypes.node
};

function MemberProvider({ children }) {
  const [setupComplete, setSetupComplete] = useState(false);
  const [setupInProgress, setSetupInProgress] = useState(false);

  const { memberDetails } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        const inProgress = window.localStorage.getItem('setupInProgress');

        setSetupInProgress(inProgress);
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, [setSetupInProgress]);

  useEffect(() => {
    if (!memberDetails) return;
    switch (memberDetails.airslipUserType) {
      case 'Merchant':
        setSetupComplete(memberDetails.linkedServices.length > 0);
        break;
      case 'Partner':
        setSetupComplete(true);
        break;
      default:
        setSetupComplete(false);
        break;
    }
  }, [memberDetails]);

  useEffect(() => {
    if (setupComplete) return;
    if (!setupInProgress) return;
    setSetupInProgress(true);
  }, [setupComplete, setupInProgress, setSetupInProgress]);

  useEffect(() => {
    window.localStorage.setItem('setupInProgress', setupInProgress);
  }, [setupInProgress]);

  const onCompleteSetup = () => {
    setSetupInProgress(false);
  };

  return (
    <MemberContext.Provider
      value={{
        setupComplete,
        setupInProgress,
        onCompleteSetup
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export { MemberProvider, MemberContext };
