import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------
const shouldRefresh = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  if (!accessToken) return false;

  const { exp } = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  const timeLeft = exp - 30 - currentTime;
  return timeLeft < 0;
};

const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { setSession, shouldRefresh, verify, sign };
