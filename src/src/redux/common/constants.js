import axios from '../../utils/axios';

export const SEARCH_DEFAULTS = {
  loading: false,
  hasData: false,
  error: {},
  response: {
    paging: {},
    results: []
  }
};

export const COMMON_FUNCTIONS = {
  startLoading(state) {
    state.isLoading = true;
  },

  finishedLoading(state) {
    state.isLoading = false;
  }
};

export const SEARCH_FUNCTIONS = {
  startSearch(state, action) {
    state[action.payload].error = {};
    state[action.payload].loading = true;
  },

  searchSuccess(state, action) {
    const { searchType, response } = action.payload;
    state[searchType].loading = false;
    state[searchType].response = response;
    state[searchType].hasData = response.results.length > 0;
  },

  searchFailed(state, action) {
    const { searchType, response } = action.payload;
    state[searchType].loading = false;
    state[searchType].error = response;
    state[searchType].response = SEARCH_DEFAULTS.response;
    state[searchType].hasData = false;
  }
};

export const STATE_DEFAULTS = {
  isLoading: false,
  error: false
};

export const GET_ALL_QUERY = {
  page: 0,
  recordsPerPage: 0,
  sort: [{ field: 'id', sort: 'asc' }],
  search: {
    items: [],
    linkOperator: 'and'
  }
};

export async function executeSearch(state, dispatch, slice, searchType, query, endPoint, servuiceUrl) {
  if (state[searchType].loading) return;

  dispatch(slice.actions.startSearch(searchType));
  try {
    const response = await axios({
      url: endPoint || `/${searchType}/search`,
      method: 'post',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: query
    });
    dispatch(
      slice.actions.searchSuccess({
        searchType,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.searchFailed({
        searchType,
        response: error
      })
    );
  }
}
