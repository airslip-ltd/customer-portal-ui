import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  accountBalances: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'balances',
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
    const { balances } = getState();
    await executeSearch(
      balances,
      dispatch,
      slice,
      'accountBalances',
      query,
      'balance/search',
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}
