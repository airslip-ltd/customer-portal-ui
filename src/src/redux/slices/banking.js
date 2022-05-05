import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch, executeDownload } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  bankTransactions: { ...SEARCH_DEFAULTS },
  accountBalances: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'banking',
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
    const { banking } = getState();
    await executeSearch(
      banking,
      dispatch,
      slice,
      'bankTransactions',
      query,
      '/banking/transactions/search',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function downloadBankTransactions(query) {
  return async () => {
    await executeDownload(query, '/banking/transactions/download', process.env.REACT_APP_ANALYTICS_URL);
  };
}

export function searchBalances(query) {
  return async (dispatch, getState) => {
    const { banking } = getState();
    await executeSearch(
      banking,
      dispatch,
      slice,
      'accountBalances',
      query,
      '/banking/balances/search',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}
