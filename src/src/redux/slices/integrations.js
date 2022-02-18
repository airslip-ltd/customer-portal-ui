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
  integrations: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'integration',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getIntegrations(query) {
  return async (dispatch, getState) => {
    const { integration } = getState();
    await executeSearch(integration, dispatch, slice, 'integrations', query);
  };
}
