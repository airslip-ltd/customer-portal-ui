import { createSlice } from '@reduxjs/toolkit';
// common
import { ACTION_FUNCTIONS, executePost } from '../common/actions';
import { REQUEST_DEFAULTS } from '../common/constants';

// ----------------------------------------------------------------------

const initialState = {
  currencyList: {
    ...REQUEST_DEFAULTS
  }
};

const slice = createSlice({
  name: 'dataLists',
  initialState,
  reducers: {
    ...ACTION_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCurrencies(query) {
  return async (dispatch, getState) => {
    const { dataLists } = getState();
    await executePost(
      dataLists,
      dispatch,
      slice,
      'currencyList',
      '/data-lists/currencies',
      query,
      process.env.REACT_APP_ANALYTICS_URL
    );
  };
}
