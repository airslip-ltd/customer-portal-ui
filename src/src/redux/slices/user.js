import { createSlice } from '@reduxjs/toolkit';
// utils
import {
  SEARCH_DEFAULTS,
  COMMON_FUNCTIONS,
  SEARCH_FUNCTIONS,
  STATE_DEFAULTS,
  executeSearch
} from '../common/constants';
import * as entities from '../common/entities';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  user: { ...SEARCH_DEFAULTS },
  current: { ...entities.ENTITY_DEFAULTS },
  profile: { ...entities.ENTITY_DEFAULTS }
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,
    ...entities.ENTITY_FUNCTIONS,

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function search(query) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await executeSearch(user, dispatch, slice, 'user', query, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeGet(user, dispatch, slice, 'current', 'user', id, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeUpdate(
      user,
      dispatch,
      slice,
      'current',
      'user',
      id,
      values,
      null,
      process.env.REACT_APP_AUTH_URL
    );
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeCreate(
      user,
      dispatch,
      slice,
      'current',
      'user',
      values,
      null,
      process.env.REACT_APP_AUTH_URL
    );
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeReset(user, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeDelete(user, dispatch, slice, 'current', 'user', id, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function getMyDetails() {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeGetMyDetails(user, dispatch, slice, 'profile', 'user', null, process.env.REACT_APP_AUTH_URL);
  };
}

export function updateMyDetails(values) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await entities.executeUpdateMyDetails(
      user,
      dispatch,
      slice,
      'profile',
      'user',
      values,
      null,
      process.env.REACT_APP_AUTH_URL
    );
  };
}
