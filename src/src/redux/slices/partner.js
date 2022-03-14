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
  partner: { ...SEARCH_DEFAULTS },
  current: { ...entities.ENTITY_DEFAULTS },
  profile: { ...entities.ENTITY_DEFAULTS }
};

const slice = createSlice({
  name: 'partner',
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
    const { partner } = getState();
    await executeSearch(partner, dispatch, slice, 'partner', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeGet(partner, dispatch, slice, 'current', 'partner', id);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeUpdate(partner, dispatch, slice, 'current', 'partner', id, values);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeCreate(partner, dispatch, slice, 'current', 'partner', values);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeReset(partner, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeDelete(partner, dispatch, slice, 'current', 'partner', id);
  };
}

export function getMyDetails() {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeGetMyDetails(partner, dispatch, slice, 'profile', 'partner');
  };
}

export function updateMyDetails(values) {
  return async (dispatch, getState) => {
    const { partner } = getState();
    await entities.executeUpdateMyDetails(partner, dispatch, slice, 'profile', 'partner', values);
  };
}
