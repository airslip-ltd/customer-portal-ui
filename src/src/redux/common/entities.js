import axios from '../../utils/axios';
import { REQUEST_STATES, REQUEST_DEFAULTS } from './constants';

export const ENTITY_FUNCTIONS = {
  resetEntity(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...REQUEST_DEFAULTS
    };
  },

  startEntityAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: true,
      status: REQUEST_STATES.loading,
      error: {},
      hasError: false
    };
  },

  entityActionSuccess(state, action) {
    const { propName, response, status } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: false,
      response,
      status: status || REQUEST_STATES.success,
      complete: response != null,
      hasError: false
    };
  },

  entityActionFailed(state, action) {
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

export async function executeGet(state, dispatch, slice, propName, entityType, id, endPoint, servuiceUrl) {
  if (state[propName].loading) return;
  if (state[propName].complete && state[propName].response.currentVersion.id === id) return;

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}/${id}`,
      method: 'get',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: response.data,
        status: REQUEST_STATES.idle
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeUpdate(state, dispatch, slice, propName, entityType, id, values, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  if (
    state[propName].complete &&
    state[propName].response.currentVersion &&
    state[propName].response.currentVersion.id === id
  ) {
    values = {
      ...state[propName].response.currentVersion,
      ...values
    };
  }

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}/${id}`,
      method: 'put',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: values
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeCreate(state, dispatch, slice, propName, entityType, values, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}`,
      method: 'post',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: values
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeReset(state, dispatch, slice, propName) {
  if (state[propName].loading) return;
  dispatch(slice.actions.resetEntity({ propName }));
}

export async function executeDelete(state, dispatch, slice, propName, entityType, id, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    await axios({
      url: endPoint || `/${entityType}/${id}`,
      method: 'delete',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: null
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeGetMyDetails(state, dispatch, slice, propName, entityType, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}`,
      method: 'get',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: response.data,
        status: REQUEST_STATES.idle
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeUpdateMyDetails(
  state,
  dispatch,
  slice,
  propName,
  entityType,
  values,
  endPoint,
  servuiceUrl
) {
  if (state[propName].loading) return;

  if (state[propName].complete && state[propName].response.currentVersion) {
    values = {
      ...state[propName].response.currentVersion,
      ...values
    };
  }

  dispatch(slice.actions.startEntityAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}`,
      method: 'put',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: values
    });
    dispatch(
      slice.actions.entityActionSuccess({
        propName,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.entityActionFailed({
        propName,
        response: error
      })
    );
  }
}
