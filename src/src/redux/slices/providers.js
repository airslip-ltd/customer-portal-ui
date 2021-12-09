import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  providerList: []
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

    getProviderListSuccess(state, action) {
      state.isLoading = false;
      state.providerList = action.payload;
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
      dispatch(slice.actions.getProviderListSuccess(response.data.providers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
