import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  merchants: [],
  merchantList: [],
  notifications: null
};

const slice = createSlice({
  name: 'merchant',
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

    getMerchantListSuccess(state, action) {
      state.isLoading = false;
      state.merchantList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMerchantList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('Getting');
      const response = await axios.get('/merchants/all');
      dispatch(slice.actions.getMerchantListSuccess(response.data.merchants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
