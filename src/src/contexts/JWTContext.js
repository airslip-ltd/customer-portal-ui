import { createContext, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { setSession } from '../utils/jwt';
import { setUserDetail, reset } from '../utils/ybug';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  REFRESH: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refresh = useCallback(async () => {
    const currentToken = window.localStorage.getItem('refreshToken');
    const accessToken = window.localStorage.getItem('accessToken');

    if (!currentToken) return false;

    const response = await axios({
      url: '/identity/refresh',
      method: 'post',
      baseURL: process.env.REACT_APP_AUTH_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        refreshToken: currentToken,
        deviceId: 'browser'
      }
    }).catch((response) => ({
      errors: response.errors
    }));

    if ('errors' in response) {
      logout();
      return false;
    }

    const { bearerToken, refreshToken, user } = response.data;
    setTimeout(() => {
      setUserDetail(user);
    }, 100);
    setSession(bearerToken, refreshToken);

    dispatch({
      type: 'REFRESH',
      payload: {
        user
      }
    });
    return true;
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (await refresh()) {
          const response = await axios({
            url: '/user',
            method: 'get',
            baseURL: process.env.REACT_APP_AUTH_URL
          });

          const { currentVersion } = response.data;

          setTimeout(() => {
            setUserDetail(currentVersion);
          }, 100);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: currentVersion
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, [refresh]);

  const login = async (email, password) => {
    const response = await axios({
      url: '/identity/login',
      method: 'post',
      baseURL: process.env.REACT_APP_AUTH_URL,
      data: {
        email,
        password,
        deviceId: 'browser',
        createUserIfNotExists: false
      }
    }).catch((response) => ({
      errors: response.errors
    }));

    if ('errors' in response) {
      return {
        isError: true,
        message: response.errors[0].message
      };
    }

    const { bearerToken, refreshToken, user } = response.data;

    setTimeout(() => {
      setUserDetail(user);
    }, 100);

    setSession(bearerToken, refreshToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });

    return {
      isError: false
    };
  };

  const logout = async () => {
    setSession(null, null);
    reset();
    window.localStorage.clear('setupInProgress');
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        refresh,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
