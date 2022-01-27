import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_INTEGRATE } from '../../routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  providerList: [],
  bankList: [],
  authUrl: null
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getBankListSuccess(state, action) {
      state.isLoading = false;
      state.bankList = action.payload;
    },

    getProviderListSuccess(state, action) {
      state.isLoading = false;
      state.providerList = action.payload;
    },

    requestProviderSuccess(state, action) {
      state.isLoading = false;
      state.authUrl = action.payload;
      state.authoriseSuccess = false;
    },

    authoriseSuccess(state) {
      state.isLoading = false;
      state.authoriseSuccess = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProviderList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/providers');
      dispatch(slice.actions.getProviderListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBankList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/banks');
      dispatch(slice.actions.getBankListSuccess(response.data.banks));
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
        `/providers/${provider}/${integration}/authorise${search}&callbackUrl=${callbackUrl}`
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
