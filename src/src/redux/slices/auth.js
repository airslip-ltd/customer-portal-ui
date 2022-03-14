import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// common
import { ACTION_DEFAULTS, ACTION_FUNCTIONS } from '../common/actions';

// ----------------------------------------------------------------------

const initialState = {
  forgot: {
    ...ACTION_DEFAULTS
  },
  password: {
    ...ACTION_DEFAULTS
  }
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...ACTION_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function forgotPassword(email) {
  return async (dispatch) => {
    dispatch(slice.actions.startAction({ propName: 'forgot' }));
    try {
      const response = await axios({
        url: '/identity/recovery',
        method: 'post',
        baseURL: process.env.REACT_APP_AUTH_URL,
        data: {
          email
        }
      });
      dispatch(slice.actions.completeAction({ propName: 'forgot', response: response.data }));
    } catch (error) {
      dispatch(
        slice.actions.errorAction({
          propName: 'forgot',
          response: error
        })
      );
    }
  };
}

export function setPassword(password, confirmPassword, email, token) {
  return async (dispatch) => {
    dispatch(slice.actions.startAction({ propName: 'password' }));
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
      dispatch(slice.actions.completeAction({ propName: 'password', response: response.data }));
    } catch (error) {
      dispatch(
        slice.actions.errorAction({
          propName: 'password',
          response: error
        })
      );
    }
  };
}

export function reset() {
  return async (dispatch) => {
    await dispatch(slice.actions.resetAction({ propName: 'forgot' }));
    await dispatch(slice.actions.resetAction({ propName: 'password' }));
  };
}
