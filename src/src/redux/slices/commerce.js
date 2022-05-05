import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch, executeDownload } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  commerceAccounts: { ...SEARCH_DEFAULTS },
  commerceTransactions: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'commerce',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function search(query) {
  return async (dispatch, getState) => {
    const { commerce } = getState();
    await executeSearch(
      commerce,
      dispatch,
      slice,
      'commerceAccounts',
      query,
      'commerce/accounts/search',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function getCommerceTransactions(query) {
  return async (dispatch, getState) => {
    const { commerce } = getState();
    await executeSearch(
      commerce,
      dispatch,
      slice,
      'commerceTransactions',
      query,
      '/commerce/transactions/search',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}

export function downloadCommerceTransactions(query) {
  return async () => {
    await executeDownload(query, '/commerce/transactions/download', process.env.REACT_APP_ANALYTICS_URL);
  };
}
