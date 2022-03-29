import axios from '../../utils/axios';
import { REQUEST_STATES, REQUEST_DEFAULTS } from './constants';

export const SEARCH_DEFAULTS = {
  ...REQUEST_DEFAULTS,
  response: {
    paging: {},
    results: []
  }
};

export const SEARCH_FUNCTIONS = {
  startSearch(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: true,
      status: REQUEST_STATES.loading,
      error: {},
      hasError: false
    };
  },

  searchSuccess(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: false,
      response,
      status: REQUEST_STATES.success,
      complete: response != null,
      hasError: false
    };
  },

  searchFailed(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      ...state[propName],
      hasError: true,
      status: REQUEST_STATES.failed,
      loading: false,
      error: response
    };
  }
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

  dispatch(slice.actions.startSearch({ propName: searchType }));
  try {
    const response = await axios({
      url: endPoint || `/${searchType}/search`,
      method: 'post',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: query
    });
    dispatch(
      slice.actions.searchSuccess({
        propName: searchType,
        response: response.data,
        status: REQUEST_STATES.idle
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.searchFailed({
        propName: searchType,
        response: error
      })
    );
  }
}

export async function executeDownload(query, endPoint, servuiceUrl) {
  try {
    await axios({
      url: endPoint,
      method: 'post',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: query,
      responseType: 'blob'
    }).then((response) => {
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const disposition = response.headers['content-disposition'];
      let filename = '';

      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);

        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    console.log(error);
  }
}
