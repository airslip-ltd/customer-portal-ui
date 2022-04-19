import { createSlice } from '@reduxjs/toolkit';
// utils
import { STATE_DEFAULTS, COMMON_FUNCTIONS } from '../common/constants';
import { SEARCH_DEFAULTS, SEARCH_FUNCTIONS, GET_ALL_QUERY, executeSearch } from '../common/search';

// ----------------------------------------------------------------------

const initialState = {
  ...STATE_DEFAULTS,
  countries: { ...SEARCH_DEFAULTS }
};

const slice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    ...COMMON_FUNCTIONS,
    ...SEARCH_FUNCTIONS
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCountries() {
  return async (dispatch, getState) => {
    const { countries } = getState();
    if (countries.countries.complete) return;
    await executeSearch(countries, dispatch, slice, 'countries', {
      ...GET_ALL_QUERY,
      sort: [{ field: 'name', sort: 'asc' }]
    });
  };
}
