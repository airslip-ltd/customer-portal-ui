import PropTypes from 'prop-types';
import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { getMyDetails } from '../redux/slices/auth';
import PleaseWait from '../pages/PleaseWait';
// material
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  memberDetails: null
};

const MemberContext = createContext({
  ...initialState
});

MemberProvider.propTypes = {
  children: PropTypes.node
};

function MemberProvider({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { member } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(getMyDetails());
  }, [dispatch, isAuthenticated]);

  if (isAuthenticated && !member.complete) {
    return <PleaseWait />;
  }

  return (
    <MemberContext.Provider
      value={{
        memberDetails: member.response.currentVersion
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export { MemberProvider, MemberContext };
