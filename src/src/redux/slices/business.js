import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS, REQUEST_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch } from '../common/search';
import * as entities from '../common/entities';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  business: { ...SEARCH_DEFAULTS },
  current: { ...REQUEST_DEFAULTS },
  profile: { ...REQUEST_DEFAULTS }
};

const slice = createSlice({
  name: 'business',
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
    const { business } = getState();
    await executeSearch(business, dispatch, slice, 'business', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeGet(business, dispatch, slice, 'current', 'business', id);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeUpdate(business, dispatch, slice, 'current', 'business', id, values);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeCreate(business, dispatch, slice, 'current', 'business', values);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeReset(business, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeDelete(business, dispatch, slice, 'current', 'business', id);
  };
}

export function getMyDetails() {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeGetMyDetails(business, dispatch, slice, 'profile', 'business');
  };
}

export function updateMyDetails(values) {
  return async (dispatch, getState) => {
    const { business } = getState();
    await entities.executeUpdateMyDetails(business, dispatch, slice, 'profile', 'business', values);
  };
}
