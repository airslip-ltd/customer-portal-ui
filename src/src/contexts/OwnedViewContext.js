import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useParams } from 'react-router-dom';
// hooks
import useMemberDetails from '../hooks/useMemberDetails';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  ownerEntityId: null,
  ownerAirslipUserType: null,
  dataQuery: {}
};

const OwnedViewContext = createContext({
  ...initialState
});

OwnedViewProvider.propTypes = {
  children: PropTypes.node
};

function OwnedViewProvider({ children }) {
  const { user } = useAuth();
  const { memberDetails } = useMemberDetails();
  const { airslipUserType, entityId } = useParams();

  let ownerEntityId = null;
  let ownerAirslipUserType = null;

  if (user.airslipUserType !== 'Administrator') {
    ownerEntityId = entityId || memberDetails.id;
    ownerAirslipUserType = airslipUserType || memberDetails.airslipUserType;
  } else {
    ownerEntityId = user.entityId;
    ownerAirslipUserType = user.airslipUserType;
  }

  return (
    <OwnedViewContext.Provider
      value={{
        ownerEntityId,
        ownerAirslipUserType,
        dataQuery: {
          ownerEntityId,
          ownerAirslipUserType
        }
      }}
    >
      {children}
    </OwnedViewContext.Provider>
  );
}

export { OwnedViewProvider, OwnedViewContext };
