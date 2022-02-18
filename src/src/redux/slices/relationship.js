import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// utils
import {
  SEARCH_DEFAULTS,
  COMMON_FUNCTIONS,
  SEARCH_FUNCTIONS,
  STATE_DEFAULTS,
  executeSearch
} from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  relationships: { ...SEARCH_DEFAULTS },
  relationship: {}
};

const slice = createSlice({
  name: 'relationship',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createSuccess(state, action) {
      state.isLoading = false;
      state.relationship = action.payload;
      state.success = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function create(email, phoneNumber, firstName, lastName, businessName, permission) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/relationships', {
        email,
        phoneNumber,
        firstName,
        lastName,
        businessName,
        permission
      });
      dispatch(slice.actions.createSuccess(response.data.currentVersion));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRelationships(query) {
  return async (dispatch, getState) => {
    const { relationship } = getState();
    await executeSearch(relationship, dispatch, slice, 'relationships', query);
  };
}
