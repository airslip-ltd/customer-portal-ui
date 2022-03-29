import axios from '../../utils/axios';
import { REQUEST_STATES, REQUEST_DEFAULTS } from './constants';

export const ACTION_FUNCTIONS = {
  // START LOADING
  startAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      status: REQUEST_STATES.loading,
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
      status: REQUEST_STATES.failed,
      loading: false,
      complete: false,
      hasError: true,
      error: response
    };
  },

  completeAction(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      status: REQUEST_STATES.success,
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
      ...REQUEST_DEFAULTS
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
