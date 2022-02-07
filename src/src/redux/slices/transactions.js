import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  recentTransactions: []
};

const slice = createSlice({
  name: 'transactions',
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

    storeRecentTransactions(state, action) {
      state.isLoading = false;
      console.log(state.recentTransactions.length);
      const idx = state.recentTransactions.findIndex((item) => item.accountId === action.payload.accountId);
      if (idx >= 0) state.recentTransactions.splice(idx, 1);
      state.recentTransactions.push(action.payload);
      console.log(state.recentTransactions.length);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRecentTransactions(accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/transactions/recent?limit=10&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeRecentTransactions({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
