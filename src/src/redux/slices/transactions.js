import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  recentBanking: {},
  recentCommerce: {},
  accounts: []
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

    storeRecentBanking(state, action) {
      state.isLoading = false;
      state.recentBanking[action.payload.accountId] = action.payload.data;
    },

    storeRecentCommerce(state, action) {
      state.isLoading = false;
      state.recentCommerce[action.payload.accountId] = action.payload.data;
    },

    storeAccounts(state, action) {
      state.isLoading = false;
      state.accounts = action.payload.records;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRecentBanking(accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/transactions/banking/recent?limit=10&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeRecentBanking({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRecentCommerce(accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/transactions/commerce/recent?limit=10&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeRecentCommerce({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAccounts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/transactions/commerce/accounts`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.storeAccounts(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
