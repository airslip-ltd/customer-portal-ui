import { createSlice } from '@reduxjs/toolkit';
// utils
import { PATH_INTEGRATE } from '../../routes/paths';
// utils
import {
  SEARCH_DEFAULTS,
  COMMON_FUNCTIONS,
  SEARCH_FUNCTIONS,
  STATE_DEFAULTS,
  GET_ALL_QUERY,
  executeSearch
} from '../common/constants';
// common
import { ACTION_DEFAULTS, ACTION_FUNCTIONS, executeGet } from '../common/actions';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  providers: { ...SEARCH_DEFAULTS },
  banks: { ...SEARCH_DEFAULTS },
  authorise: { ...ACTION_DEFAULTS },
  request: { ...ACTION_DEFAULTS }
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,
    ...ACTION_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProviders() {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.hasData) return;
    await executeSearch(provider, dispatch, slice, 'providers', {
      ...GET_ALL_QUERY,
      sort: [
        { field: 'priority', sort: 'asc' },
        { field: 'id', sort: 'asc' }
      ]
    });
  };
}

export function getBanks() {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.hasData) return;
    await executeSearch(provider, dispatch, slice, 'banks', GET_ALL_QUERY, 'integrations');
  };
}

export function requestProvider(providerName, integration, search) {
  return async (dispatch, getState) => {
    const { provider } = getState();
    const callbackUrl = `${window.location.protocol}//${window.location.hostname}${PATH_INTEGRATE.complete}/${providerName}/${integration}`;
    await executeGet(
      provider,
      dispatch,
      slice,
      'request',
      `/providers/${providerName}/${integration}/authorise${search || '?'}&callbackUrl=${callbackUrl}`
    );
  };
}

export function authoriseProvider(providerName, integration, search) {
  return async (dispatch, getState) => {
    const { provider } = getState();
    await executeGet(
      provider,
      dispatch,
      slice,
      'authorise',
      `/providers/${providerName}/${integration}/authorised${search}`
    );
  };
}
