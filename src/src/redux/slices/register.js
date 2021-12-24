import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: {},
  registration: {},
  registerSuccess: false,
  referral: {}
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
    },

    referralSuccess(state, action) {
      state.isLoading = false;
      state.referral = action.payload;
      state.success = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function register(email, password, firstName, lastName, businessName, referralId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/business', {
        email,
        password,
        firstName,
        lastName,
        businessName,
        referralId
      });
      dispatch(slice.actions.registerBusinessSuccess(response.data.currentVersion));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function loadReferral(referralId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/relationship/referral?referralId=${encodeURIComponent(referralId)}`);
      dispatch(slice.actions.referralSuccess(response.data.currentVersion));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
