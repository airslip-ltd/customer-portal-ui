import PropTypes from 'prop-types';
import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { getMyDetails } from '../redux/slices/auth';
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

  if (!member.complete) {
    return <></>;
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
