import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS, REQUEST_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch } from '../common/search';
import * as entities from '../common/entities';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  integration: { ...SEARCH_DEFAULTS },
  current: { ...REQUEST_DEFAULTS }
};

const slice = createSlice({
  name: 'integration',
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
    const { integration } = getState();
    await executeSearch(integration, dispatch, slice, 'integration', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { integration } = getState();
    await entities.executeGet(integration, dispatch, slice, 'current', 'integration', id);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { integration } = getState();
    await entities.executeReset(integration, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { integration } = getState();
    await entities.executeDelete(integration, dispatch, slice, 'current', 'integration', id);
  };
}
