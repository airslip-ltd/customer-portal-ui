import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { API_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  integrations: { ...API_DEFAULTS }
};

const slice = createSlice({
  name: 'integration',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.isLoading = true;
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

    getIntegrationsSuccess(state, action) {
      state.integrations.loading = false;
      state.integrations.response = action.payload;
      state.integrations.hasData = action.payload.results.length > 0;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getIntegrations(query) {
  return async (dispatch, getState) => {
    const { provider } = getState();
    if (provider.providers.loading || provider.providers.hasData) return;

    dispatch(slice.actions.startLoading('integrations'));
    try {
      const response = await axios.post('/integrations', query);
      dispatch(slice.actions.getIntegrationsSuccess(response.data));
      dispatch(slice.actions.finishedLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
