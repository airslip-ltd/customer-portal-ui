import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
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
  authUrl: null
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,
    ...ACTION_FUNCTIONS,

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    requestProviderSuccess(state, action) {
      state.isLoading = false;
      state.authUrl = action.payload;
      state.authoriseSuccess = false;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProviders() {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.hasData) return;
    await executeSearch(provider, dispatch, slice, 'providers', GET_ALL_QUERY);
  };
}

export function getBanks() {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.hasData) return;
    await executeSearch(provider, dispatch, slice, 'banks', GET_ALL_QUERY, 'integrations');
  };
}

export function requestProvider(provider, integration, search) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const callbackUrl = `${window.location.protocol}//${window.location.hostname}${PATH_INTEGRATE.complete}/${provider}/${integration}`;
      const response = await axios.get(
        `/providers/${provider}/${integration}/authorise${search || '?'}&callbackUrl=${callbackUrl}`
      );
      dispatch(slice.actions.requestProviderSuccess(response.data.authorisationUrl));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
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
