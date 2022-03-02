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
        const inProgress = window.localStorage.getItem('setupInProgress') === 'true';

        setSetupInProgress(inProgress);
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, [setSetupInProgress]);

  useEffect(() => {
    if (!memberDetails) return;
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
    console.log('beginSetup');
    setSetupInProgress(true);
  };

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
