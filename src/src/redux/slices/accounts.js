import { createSlice } from '@reduxjs/toolkit';
// utils
import { COMMON_FUNCTIONS, STATE_DEFAULTS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, executeSearch } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  accounts: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAccounts(query) {
  return async (dispatch, getState) => {
    const { account } = getState();
    await executeSearch(account, dispatch, slice, 'accounts', query);
  };
}
