import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch, executeDownload } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  bankTransactions: { ...SEARCH_DEFAULTS },
  commerceTransactions: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBankTransactions(query) {
  return async (dispatch, getState) => {
    const { reports } = getState();
    await executeSearch(
      reports,
      dispatch,
      slice,
      'bankTransactions',
      query,
      '/reports/bank-transactions',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function downloadBankTransactions(query) {
  return async () => {
    await executeDownload(query, '/reports/bank-transactions/download', process.env.REACT_APP_ANALYTICS_URL);
  };
}

export function getCommerceTransactions(query) {
  return async (dispatch, getState) => {
    const { reports } = getState();
    await executeSearch(
      reports,
      dispatch,
      slice,
      'commerceTransactions',
      query,
      '/reports/commerce-transactions',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function downloadCommerceTransactions(query) {
  return async () => {
    await executeDownload(query, '/reports/commerce-transactions/download', process.env.REACT_APP_ANALYTICS_URL);
  };
}
