import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
// material
import useMemberDetails from '../hooks/useMemberDetails';

// ----------------------------------------------------------------------

const initialState = {
  setupComplete: false,
  setupInProgress: false,
  onCompleteSetup: () => {}
};

const SetupContext = createContext({
  ...initialState
});

SetupProvider.propTypes = {
  children: PropTypes.node
};

function SetupProvider({ children }) {
  const [setupComplete, setSetupComplete] = useState(false);
  const [setupInProgress, setSetupInProgress] = useState(false);

  const { memberDetails } = useMemberDetails();

  useEffect(() => {
    const initialize = async () => {
      try {
        const inProgress = window.localStorage.getItem('setupInProgress') === 'true';

        setSetupInProgress(inProgress);
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, [setSetupInProgress]);

  useEffect(() => {
    if (!memberDetails.airslipUserType) return;
    let newSetupComplete = false;

    switch (memberDetails.airslipUserType) {
      case 'Merchant':
        newSetupComplete = memberDetails.linkedServices.length > 0;
        break;
      case 'Partner':
        newSetupComplete = true;
        break;
      default:
        break;
    }

    setSetupComplete(newSetupComplete);
    if (!newSetupComplete) beginSetup();
  }, [memberDetails]);

  useEffect(() => {
    window.localStorage.setItem('setupInProgress', setupInProgress);
  }, [setupInProgress]);

  const beginSetup = () => {
    setSetupInProgress(true);
  };

  const onCompleteSetup = () => {
    setSetupInProgress(false);
  };

  return (
    <SetupContext.Provider
      value={{
        setupComplete,
        setupInProgress,
        onCompleteSetup
      }}
    >
      {children}
    </SetupContext.Provider>
  );
}

export { SetupProvider, SetupContext };
