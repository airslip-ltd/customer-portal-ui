import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  integrationList: []
};

const slice = createSlice({
  name: 'account',
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

    getIntegrationListSuccess(state, action) {
      state.isLoading = false;
      state.integrationList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getIntegrationList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/integrations');
      dispatch(slice.actions.getIntegrationListSuccess(response.data.integrations));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
