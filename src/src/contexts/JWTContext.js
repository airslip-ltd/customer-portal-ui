import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

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
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);

          const response = await axios({
            url: '/user',
            method: 'get',
            baseURL: process.env.REACT_APP_AUTH_URL
          });

          console.log(response.data.currentVersion);

          const { currentVersion } = response.data;

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
  }, []);

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

  const refresh = async () => {
    console.log('refresh token');
    const currentToken = window.localStorage.getItem('refreshToken');
    const response = await axios({
      url: '/identity/refresh',
      method: 'post',
      baseURL: process.env.REACT_APP_AUTH_URL,
      data: {
        refreshToken: currentToken,
        deviceId: 'browser'
      }
    }).catch((response) => ({
      errors: response.errors
    }));

    if ('errors' in response) {
      logout();
      return;
    }

    const { bearerToken, refreshToken, user } = response.data;

    setSession(bearerToken, refreshToken);
    dispatch({
      type: 'REFRESH',
      payload: {
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null, null);
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
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
