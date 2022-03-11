import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// common
import { FUNCTION_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  forgot: {
    ...FUNCTION_DEFAULTS
  },
  password: {
    ...FUNCTION_DEFAULTS
  }
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      const { propName } = action.payload;
      state[propName] = {
        loading: true,
        complete: false,
        error: {}
      };
    },

    // HAS ERROR
    hasError(state, action) {
      const { propName, response } = action.payload;
      state[propName] = {
        loading: false,
        complete: false,
        error: response
      };
    },

    complete(state, action) {
      const { propName, response } = action.payload;
      state[propName] = {
        loading: false,
        complete: true,
        error: {},
        response
      };
    },

    reset(state, action) {
      const { propName } = action.payload;
      state[propName] = {
        ...FUNCTION_DEFAULTS
      };
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function forgotPassword(email) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading({ propName: 'forgot' }));
    try {
      const response = await axios({
        url: '/identity/recovery',
        method: 'post',
        baseURL: process.env.REACT_APP_AUTH_URL,
        data: {
          email
        }
      });
      dispatch(slice.actions.complete({ propName: 'forgot', response: response.data }));
    } catch (error) {
      dispatch(
        slice.actions.hasError({
          propName: 'forgot',
          response: error
        })
      );
    }
  };
}

export function setPassword(password, confirmPassword, email, token) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading({ propName: 'password' }));
    try {
      const response = await axios({
        url: '/identity/password',
        method: 'post',
        baseURL: process.env.REACT_APP_AUTH_URL,
        data: {
          password,
          confirmPassword,
          email,
          token: token.replace(/ /g, '+')
        }
      });
      dispatch(slice.actions.complete({ propName: 'password', response: response.data }));
    } catch (error) {
      dispatch(
        slice.actions.hasError({
          propName: 'password',
          response: error
        })
      );
    }
  };
}

export function reset() {
  return async (dispatch) => {
    await dispatch(slice.actions.reset({ propName: 'forgot' }));
    await dispatch(slice.actions.reset({ propName: 'password' }));
  };
}
