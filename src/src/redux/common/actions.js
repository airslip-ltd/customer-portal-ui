import axios from '../../utils/axios';

export const ACTION_DEFAULTS = {
  status: 'idle',
  loading: false,
  complete: false,
  hasError: false,
  error: {},
  response: {}
};

export const ACTION_FUNCTIONS = {
  // START LOADING
  startAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      status: 'loading',
      loading: true,
      complete: false,
      hasError: false,
      error: {}
    };
  },

  // HAS ERROR
  errorAction(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      status: 'error',
      loading: false,
      complete: false,
      hasError: true,
      error: response
    };
  },

  completeAction(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      status: 'complete',
      loading: false,
      complete: true,
      hasError: false,
      error: {},
      response
    };
  },

  resetAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...ACTION_DEFAULTS
    };
  }
};

export async function executePost(state, dispatch, slice, propName, url, data, serviceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startAction({ propName }));
  try {
    const response = await axios({
      url,
      method: 'post',
      baseURL: serviceUrl || process.env.REACT_APP_API_URL,
      data
    });
    dispatch(
      slice.actions.completeAction({
        propName,
        response: response.data
      })
    );
  } catch (error) {
    dispatch(
      slice.actions.errorAction({
        propName,
        response: error
      })
    );
  }
}

export async function executeGet(state, dispatch, slice, propName, url, serviceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startAction({ propName }));
  try {
    const response = await axios({
      url,
      method: 'get',
      baseURL: serviceUrl || process.env.REACT_APP_API_URL
    });
    dispatch(
      slice.actions.completeAction({
        propName,
        response: response.data
      })
    );
  } catch (error) {
    dispatch(
      slice.actions.errorAction({
        propName,
        response: error
      })
    );
  }
}
