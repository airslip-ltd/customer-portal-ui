import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// common
import { ACTION_FUNCTIONS, executePost } from '../common/actions';
import { REQUEST_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  currentBalance: {
    ...REQUEST_DEFAULTS
  },
  salesStats: {
    ...REQUEST_DEFAULTS
  },
  refundStats: {
    ...REQUEST_DEFAULTS
  }
};

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    ...ACTION_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCurrentBalance(query) {
  return async (dispatch, getState) => {
    const { analytics } = getState();
    await executePost(
      analytics,
      dispatch,
      slice,
      'currentBalance',
      '/snapshot/currentbalance',
      query,
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function getSalesShapshot(query, withRange, accountId) {
  return async (dispatch, getState) => {
    const { analytics } = getState();
    await executePost(
      analytics,
      dispatch,
      slice,
      'salesStats',
      `/snapshot/TotalSales?dayRange=${withRange || 30}&accountId=${accountId}`,
      query,
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function getRefundShapshot(query, withRange, accountId) {
  return async (dispatch, getState) => {
    const { analytics } = getState();
    await executePost(
      analytics,
      dispatch,
      slice,
      'refundStats',
      `/snapshot/TotalRefunds?dayRange=${withRange || 30}&accountId=${accountId}`,
      query,
      process.env.REACT_APP_ANALYTICS_URL
    );
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
