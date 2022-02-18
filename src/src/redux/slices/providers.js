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

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  providers: { ...SEARCH_DEFAULTS },
  banks: { ...SEARCH_DEFAULTS },
  authUrl: null,
  validation: 'InProgress'
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS,

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    requestProviderSuccess(state, action) {
      state.isLoading = false;
      state.authUrl = action.payload;
      state.authoriseSuccess = false;
    },

    authoriseSuccess(state) {
      state.isLoading = false;
      state.authoriseSuccess = true;
    },

    validationResult(state, action) {
      state.isLoading = false;
      state.validation = action.payload;
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
    await executeSearch(provider, dispatch, slice, 'banks', GET_ALL_QUERY);
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

export function authoriseProvider(provider, integration, search) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get(`/providers/${provider}/${integration}/authorised${search}`);
      dispatch(slice.actions.authoriseSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function validateInitiation(provider, integration, search) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get(`/providers/${provider}/${integration}/validate${search}`);
      dispatch(slice.actions.validationResult('valid'));
    } catch (error) {
      dispatch(slice.actions.validationResult('invalid'));
      dispatch(slice.actions.hasError(error));
    }
  };
}
