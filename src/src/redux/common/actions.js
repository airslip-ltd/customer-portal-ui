import axios from '../../utils/axios';

export const ACTION_DEFAULTS = {
  loading: false,
  complete: false,
  error: {},
  response: {}
};

export const ACTION_FUNCTIONS = {
  // START LOADING
  startAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      loading: true,
      complete: false,
      error: {}
    };
  },

  // HAS ERROR
  errorAction(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      loading: false,
      complete: false,
      error: response
    };
  },

  completeAction(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      loading: false,
      complete: true,
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
    dispatch(slice.actions.finishedLoading());
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
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.errorAction({
        propName,
        response: error
      })
    );
  }
}
