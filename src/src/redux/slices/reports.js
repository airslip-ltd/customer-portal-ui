import { createSlice } from '@reduxjs/toolkit';
// utils
import {
  SEARCH_DEFAULTS,
  COMMON_FUNCTIONS,
  SEARCH_FUNCTIONS,
  STATE_DEFAULTS,
  executeSearch
} from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  bankTransactions: { ...SEARCH_DEFAULTS }
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
