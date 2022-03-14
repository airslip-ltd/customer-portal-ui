import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
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
  consent: { ...SEARCH_DEFAULTS },
  current: { ...entities.ENTITY_DEFAULTS }
};

const slice = createSlice({
  name: 'consent',
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
    const { consent } = getState();
    await executeSearch(consent, dispatch, slice, 'consent', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { consent } = getState();
    await entities.executeGet(consent, dispatch, slice, 'current', 'consent', id);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { consent } = getState();
    await entities.executeReset(consent, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { consent } = getState();
    await entities.executeDelete(consent, dispatch, slice, 'current', 'consent', id);
  };
}
