import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_INTEGRATE } from '../../routes/paths';
import { API_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  providers: { ...API_DEFAULTS },
  banks: { ...API_DEFAULTS },
  authUrl: null,
  validation: 'InProgress'
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.isLoading = true;
      if (action.payload) state[action.payload].loading = true;
    },

    finishedLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getBanksSuccess(state, action) {
      state.banks.loading = false;
      state.banks.response = action.payload;
      state.banks.hasData = action.payload.results.length > 0;
    },

    getProvidersSuccess(state, action) {
      state.providers.loading = false;
      state.providers.response = action.payload;
      state.providers.hasData = action.payload.results.length > 0;
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
    if (provider.providers.loading || provider.providers.hasData) return;

    dispatch(slice.actions.startLoading('providers'));
    try {
      const response = await axios.post('/providers', {
        page: 0,
        recordsPerPage: 0,
        sort: [{ field: 'id', sort: 'asc' }],
        search: {
          items: [],
          linkOperator: 'and'
        }
      });
      dispatch(slice.actions.getProvidersSuccess(response.data));
      dispatch(slice.actions.finishedLoading('providers'));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBanks() {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.banks.loading || provider.banks.hasData) return;

    dispatch(slice.actions.startLoading('banks'));
    try {
      const response = await axios.post('/banks', {
        page: 0,
        recordsPerPage: 0,
        sort: [{ field: 'id', sort: 'asc' }],
        search: {
          items: [],
          linkOperator: 'and'
        }
      });
      dispatch(slice.actions.getBanksSuccess(response.data));
      dispatch(slice.actions.finishedLoading('banks'));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
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
