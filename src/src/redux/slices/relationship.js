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
import * as actions from '../common/actions';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  relationship: { ...SEARCH_DEFAULTS },
  current: { ...entities.ENTITY_DEFAULTS },
  referral: {
    ...actions.ACTION_DEFAULTS
  }
};

const slice = createSlice({
  name: 'relationship',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,
    ...entities.ENTITY_FUNCTIONS,
    ...actions.ACTION_FUNCTIONS,

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
    const { relationship } = getState();
    await executeSearch(relationship, dispatch, slice, 'relationship', query);
  };
}

export function get(id) {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await entities.executeGet(relationship, dispatch, slice, 'current', 'relationship', id);
  };
}

export function update(id, values) {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await entities.executeUpdate(relationship, dispatch, slice, 'current', 'relationship', id, values);
  };
}

export function create(values) {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await entities.executeCreate(relationship, dispatch, slice, 'current', 'relationship', values);
  };
}

export function reset() {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await entities.executeReset(relationship, dispatch, slice, 'current');
  };
}

export function del(id) {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await entities.executeDelete(relationship, dispatch, slice, 'current', 'relationship', id);
  };
}

export function getReferralLink(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startAction({ propName: 'referral' }));
    try {
      const response = await axios({
        url: `/relationship/link/${id}`,
        method: 'get',
        baseURL: process.env.REACT_APP_API_URL
      });
      dispatch(slice.actions.completeAction({ propName: 'referral', response: response.data }));
    } catch (error) {
      dispatch(
        slice.actions.errorAction({
          propName: 'referral',
          response: error
        })
      );
    }
  };
}
