import PropTypes from 'prop-types';
import { createContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../redux/store';
import { get } from '../redux/slices/relationship';

// ----------------------------------------------------------------------

const initialState = {
  relationship: null
};

const RelationshipContext = createContext({
  ...initialState
});

RelationshipProvider.propTypes = {
  children: PropTypes.node
};

function RelationshipProvider({ children }) {
  const dispatch = useDispatch();
  const { partnerRelationshipId } = useParams();
  const { current } = useSelector((state) => state.relationship);

  useEffect(() => {
    if (partnerRelationshipId) dispatch(get(partnerRelationshipId));
  }, [dispatch, partnerRelationshipId]);

  if (!partnerRelationshipId) {
    return <Navigate to="/404" />;
  }

  if (!current.complete) {
    return <></>;
  }

  return (
    <RelationshipContext.Provider
      value={{
        relationship: current.response.currentVersion
      }}
    >
      {children}
    </RelationshipContext.Provider>
  );
}

export { RelationshipProvider, RelationshipContext };
