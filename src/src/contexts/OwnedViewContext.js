import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { useParams } from 'react-router-dom';
// hooks
import useMemberDetails from '../hooks/useMemberDetails';

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
  const { memberDetails } = useMemberDetails();
  const { airslipUserType, entityId } = useParams();

  const [ownerEntityId] = useState(entityId || memberDetails.id);
  const [ownerAirslipUserType] = useState(airslipUserType || memberDetails.airslipUserType);

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
