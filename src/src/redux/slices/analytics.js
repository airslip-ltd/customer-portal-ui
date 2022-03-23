import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// common
import { ACTION_DEFAULTS, ACTION_FUNCTIONS, executeGet } from '../common/actions';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  currentBalance: {
    ...ACTION_DEFAULTS
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

export function getCurrentBalance() {
  return async (dispatch, getState) => {
    const { analytics } = getState();
    await executeGet(
      analytics,
      dispatch,
      slice,
      'currentBalance',
      '/snapshot/currentbalance',
      process.env.REACT_APP_ANALYTICS_URL
    );
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
