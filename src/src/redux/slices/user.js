import { createSlice } from '@reduxjs/toolkit';
// utils
import {
  SEARCH_DEFAULTS,
  COMMON_FUNCTIONS,
  SEARCH_FUNCTIONS,
  STATE_DEFAULTS,
  executeSearch
} from '../common/constants';
import {
  ENTITY_DEFAULTS,
  ACTION_FUNCTIONS,
  executeGet,
  executeUpdate,
  executeCreate,
  executeReset,
  executeDelete
} from '../common/entities';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  user: { ...SEARCH_DEFAULTS },
  current: { ...ENTITY_DEFAULTS }
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,
    ...ACTION_FUNCTIONS,

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
    await executeGet(user, dispatch, slice, 'current', 'user', id, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await executeUpdate(user, dispatch, slice, 'current', 'user', id, values, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await executeCreate(user, dispatch, slice, 'current', 'user', values, null, process.env.REACT_APP_AUTH_URL);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { user } = getState();
    await executeReset(user, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { user } = getState();
    await executeDelete(user, dispatch, slice, 'current', 'user', id, null, process.env.REACT_APP_AUTH_URL);
  };
}
