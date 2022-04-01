import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { getMyDetails } from '../redux/slices/auth';
// material
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  memberDetails: null,
  refresh: () => {}
};

const MemberContext = createContext({
  ...initialState
});

MemberProvider.propTypes = {
  children: PropTypes.node
};

function MemberProvider({ children }) {
  const dispatch = useDispatch();
  const [memberDetails, setMemberDetails] = useState({});
  const { isAuthenticated } = useAuth();
  const { member } = useSelector((state) => state.auth);

  const refreshMember = useCallback(() => {
    if (isAuthenticated) dispatch(getMyDetails());
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated) refreshMember();
  }, [isAuthenticated, refreshMember]);

  useEffect(() => {
    if (isAuthenticated && member.complete) {
      setMemberDetails(member.response.currentVersion);
    }
  }, [member, isAuthenticated, memberDetails]);

  return (
    <MemberContext.Provider
      value={{
        memberDetails,
        refresh: refreshMember
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export { MemberProvider, MemberContext };
