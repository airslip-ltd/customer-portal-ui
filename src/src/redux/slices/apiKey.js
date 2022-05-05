import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS, REQUEST_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch } from '../common/search';
import * as entities from '../common/entities';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  apikey: { ...SEARCH_DEFAULTS },
  current: { ...REQUEST_DEFAULTS }
};

const slice = createSlice({
  name: 'apiKey',
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
    const { apiKey } = getState();
    await executeSearch(apiKey, dispatch, slice, 'apikey', query, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { apiKey } = getState();
    await entities.executeGet(apiKey, dispatch, slice, 'current', 'apikey', id, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { apiKey } = getState();
    await entities.executeCreate(
      apiKey,
      dispatch,
      slice,
      'current',
      'apikey',
      values,
      null,
      process.env.REACT_APP_AUTH_URL
    );
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { apiKey } = getState();
    await entities.executeDelete(
      apiKey,
      dispatch,
      slice,
      'current',
      'apikey',
      id,
      null,
      process.env.REACT_APP_AUTH_URL
    );
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { apiKey } = getState();
    await entities.executeReset(apiKey, dispatch, slice, 'current');
  };
}
