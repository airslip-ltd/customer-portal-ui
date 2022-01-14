import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  currentBalance: {}
};

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCurrentBalanceSuccess(state, action) {
      state.isLoading = false;
      state.currentBalance = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCurrentBalance() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: '/balance',
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.getCurrentBalanceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
