import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useParams } from 'react-router-dom';
// hooks
import useMemberDetails from '../hooks/useMemberDetails';
import useAuth from '../hooks/useAuth';
import useRelationship from '../hooks/useRelationship';

// ----------------------------------------------------------------------

const initialState = {
  ownerEntityId: null,
  ownerAirslipUserType: null,
  linkedServices: {
    banking: false,
    accounting: false,
    commerce: false
  },
  dataOwnerQuery: {},
  buildOwnedPath: () => {}
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
  const { relationship } = useRelationship();
  const { airslipUserType, entityId } = useParams();

  let ownerEntityId = null;
  let ownerAirslipUserType = null;
  let bankLinked = memberDetails.bankLinked || false;
  let accountingLinked = memberDetails.accountingLinked || false;
  let commerceLinked = memberDetails.commerceLinked || false;

  if (user.airslipUserType !== 'Administrator') {
    ownerEntityId = entityId || memberDetails.id;
    ownerAirslipUserType = airslipUserType || memberDetails.airslipUserType;

    if (relationship && relationship.related) {
      const { related } = relationship;
      const { business } = related;

      bankLinked = business.bankLinked;
      accountingLinked = business.accountingLinked;
      commerceLinked = business.commerceLinked;
    }
  } else {
    ownerEntityId = user.entityId;
    ownerAirslipUserType = user.airslipUserType;
  }

  const buildOwnedPath = (path) => {
    if (user.airslipUserType !== 'Partner') return path;
    if (!relationship) return path;

    // Standard format should be:
    //  URL/:relationshipId/:airslipUserType/:entityId
    return `${path}/${relationship.id}/${ownerAirslipUserType}/${ownerEntityId}`;
  };

  return (
    <OwnedViewContext.Provider
      value={{
        ownerEntityId,
        ownerAirslipUserType,
        linkedServices: {
          banking: bankLinked,
          accounting: accountingLinked,
          commerce: commerceLinked
        },
        dataOwnerQuery: {
          ownerEntityId,
          ownerAirslipUserType
        },
        buildOwnedPath
      }}
    >
      {children}
    </OwnedViewContext.Provider>
  );
}

export { OwnedViewProvider, OwnedViewContext };
