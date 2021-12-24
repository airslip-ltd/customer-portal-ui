import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  success: false,
  error: {},
  relationship: {},
  relationshipList: []
};

const slice = createSlice({
  name: 'relationship',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.error = {};
      state.relationship = {};
      state.isLoading = true;
      state.success = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createSuccess(state, action) {
      state.isLoading = false;
      state.relationship = action.payload;
      state.success = true;
    },

    getRelationshipListSuccess(state, action) {
      state.isLoading = false;
      state.relationshipList = action.payload;
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
      const response = await axios.post('/relationship', {
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

export function getRelationshipList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/relationship');
      dispatch(slice.actions.getRelationshipListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
