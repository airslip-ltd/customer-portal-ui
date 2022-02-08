import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  currentBalance: {},
  salesStats: {},
  refundStats: {},
  revenueStats: {},
  cashflowStats: {}
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
    },

    storeSalesSnapshot(state, action) {
      state.isLoading = false;
      state.salesStats[action.payload.accountId] = action.payload.data;
    },

    storeRefundSnapshot(state, action) {
      state.isLoading = false;
      state.refundStats[action.payload.accountId] = action.payload.data;
    },

    storeRevenue(state, action) {
      state.isLoading = false;
      state.revenueStats[action.payload.accountId] = action.payload.data;
    },

    storeCashflow(state, action) {
      state.isLoading = false;
      state.cashflowStats[action.payload.accountId] = action.payload.data;
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
        url: '/snapshot/CurrentBalance',
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.getCurrentBalanceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSalesShapshot(withRange, accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/TotalSales?dayRange=${withRange || 30}&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeSalesSnapshot({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRefundShapshot(withRange, accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/TotalRefunds?dayRange=${withRange || 30}&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeRefundSnapshot({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRevenueByYear(year, accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/revenue?year=${year}&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeRevenue({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCashflowByYear(year, accountId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/cashflow?year=${year}&accountId=${accountId}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(
        slice.actions.storeCashflow({
          data: response.data,
          accountId
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
