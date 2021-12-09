import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  accountList: []
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

    getAccountListSuccess(state, action) {
      state.isLoading = false;
      state.accountList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAccountList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/accounts');
      dispatch(slice.actions.getAccountListSuccess(response.data.accounts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
