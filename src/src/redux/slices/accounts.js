import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { API_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  accounts: { ...API_DEFAULTS }
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.isLoading = true;
      console.log(action.payload);
      if (action.payload) state[action.payload].loading = true;
    },

    finishedLoading(state, action) {
      state.isLoading = false;
      if (action.payload) state[action.payload].loading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAccountsSuccess(state, action) {
      state.accounts.loading = false;
      state.accounts.response = action.payload;
      state.accounts.hasData = action.payload.results.length > 0;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAccounts(query) {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.loading || provider.providers.hasData) return;

    dispatch(slice.actions.startLoading('accounts'));
    try {
      const response = await axios.post('/accounts', query);
      dispatch(slice.actions.getAccountsSuccess(response.data));
      dispatch(slice.actions.finishedLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
