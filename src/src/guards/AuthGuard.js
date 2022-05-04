import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import GetStarted from '../pages/authentication/GetStarted';
// utils
import { shouldRefresh } from '../utils/jwt';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, refresh } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const [refreshAuth, setRefreshAuth] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshAuth(shouldRefresh());
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [setRefreshAuth]);

  useEffect(() => {
    if (!refreshAuth) return;
    refresh();
    setRefreshAuth(false);
  }, [refreshAuth, refresh]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <GetStarted />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
