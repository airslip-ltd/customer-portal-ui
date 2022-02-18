import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: {},
  registration: {},
  registerSuccess: false
};

const slice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.error = {};
      state.registration = {};
      state.registerSuccess = false;
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearError(state) {
      state.isLoading = false;
      state.error = {};
    },

    registerPartnerSuccess(state, action) {
      state.isLoading = false;
      state.registration = action.payload;
      state.registerSuccess = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function reset() {
  return (dispatch) => {
    dispatch(slice.actions.clearError());
  };
}

export function register(email, password, firstName, lastName, partnerName) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/partner', {
        email,
        password,
        firstName,
        lastName,
        partnerName
      });
      dispatch(slice.actions.registerPartnerSuccess(response.data.currentVersion));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
