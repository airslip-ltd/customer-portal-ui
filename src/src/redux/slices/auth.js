import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// common
import { ACTION_FUNCTIONS, executeGet } from '../common/actions';
import { REQUEST_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  member: {
    ...REQUEST_DEFAULTS
  },
  forgot: {
    ...REQUEST_DEFAULTS
  },
  password: {
    ...REQUEST_DEFAULTS
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

export function getMyDetails() {
  return async (dispatch, getState) => {
    const { auth } = getState();
    await executeGet(auth, dispatch, slice, 'member', '/my/details');
  };
}
