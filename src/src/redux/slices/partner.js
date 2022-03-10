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
  partner: { ...SEARCH_DEFAULTS },
  current: { ...ENTITY_DEFAULTS }
};

const slice = createSlice({
  name: 'partner',
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
    const { partner } = getState();
    await executeSearch(partner, dispatch, slice, 'partner', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await executeGet(partner, dispatch, slice, 'current', 'partner', id);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await executeUpdate(partner, dispatch, slice, 'current', 'partner', id, values);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await executeCreate(partner, dispatch, slice, 'current', 'partner', values);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await executeReset(partner, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await executeDelete(partner, dispatch, slice, 'current', 'partner', id);
  };
}
