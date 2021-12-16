import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_LINKING } from '../../routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  bankList: [],
  consentUrl: null
};

const slice = createSlice({
  name: 'bank',
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

    getConsentSuccess(state, action) {
      state.isLoading = false;
      state.consentUrl = action.payload;
      state.authoriseSuccess = false;
    },

    authoriseConsentSuccess(state) {
      state.isLoading = false;
      state.authoriseSuccess = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

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

export function requestConsent(provider, institutionId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const callbackUrl = `${window.location.protocol}//${window.location.hostname}${PATH_LINKING.accountLinked}`;
      const response = await axios.get(`/consents/${provider}/${institutionId}/authorise?callbackUrl=${callbackUrl}`);
      dispatch(slice.actions.getConsentSuccess(response.data.authorisationUrl));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function authoriseConsent(provider, search) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get(`/consents/${provider}/authorised-institution${search}`);
      dispatch(slice.actions.authoriseConsentSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
