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
  cashflowStats: []
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
      state.salesStats = action.payload;
    },

    storeRefundSnapshot(state, action) {
      state.isLoading = false;
      state.refundStats = action.payload;
    },

    storeRevenue(state, action) {
      state.isLoading = false;
      state.revenueStats = action.payload;
    },

    storeCashflow(state, action) {
      state.isLoading = false;
      console.log(state.cashflowStats.length);
      const idx = state.cashflowStats.findIndex((item) => item.accountId === action.payload.accountId);
      if (idx >= 0) state.cashflowStats.splice(idx, 1);
      state.cashflowStats.push(action.payload);
      console.log(state.cashflowStats.length);
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

export function getSalesShapshot(withRange) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/TotalSales?dayRange=${withRange || 30}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.storeSalesSnapshot(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRefundShapshot(withRange) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/TotalRefunds?dayRange=${withRange || 30}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.storeRefundSnapshot(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRevenueByYear(year) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios({
        url: `/snapshot/revenue?year=${year}`,
        method: 'get',
        baseURL: process.env.REACT_APP_ANALYTICS_URL
      });
      dispatch(slice.actions.storeRevenue(response.data));
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
