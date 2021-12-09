import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  bankList: []
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
