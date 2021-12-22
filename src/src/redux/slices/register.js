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
  name: 'register',
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

    registerBusinessSuccess(state, action) {
      state.isLoading = false;
      state.registration = action.payload;
      state.registerSuccess = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function register(email, password, firstName, lastName, businessName) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/business', {
        email,
        password,
        firstName,
        lastName,
        businessName
      });
      dispatch(slice.actions.registerBusinessSuccess(response.data.currentVersion));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
