import axios from '../../utils/axios';

export const ENTITY_DEFAULTS = {
  loading: false,
  status: 'neutral',
  hasData: false,
  hasError: false,
  error: {},
  response: {}
};

export const ACTION_FUNCTIONS = {
  resetAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...ENTITY_DEFAULTS
    };
  },

  startAction(state, action) {
    const { propName } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: true,
      status: 'inprogress',
      error: {},
      hasError: false
    };
  },

  actionSuccess(state, action) {
    const { propName, response, status } = action.payload;
    state[propName] = {
      ...state[propName],
      loading: false,
      response,
      status: status || 'success',
      hasData: true,
      hasError: false
    };
  },

  actionFailed(state, action) {
    const { propName, response } = action.payload;
    state[propName] = {
      ...state[propName],
      hasError: true,
      status: 'failed',
      loading: false,
      error: response
    };
  }
};

export async function executeGet(state, dispatch, slice, propName, entityType, id, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}/${id}`,
      method: 'get',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL
    });
    dispatch(
      slice.actions.actionSuccess({
        propName,
        response: response.data,
        status: 'neutral'
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.actionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeUpdate(state, dispatch, slice, propName, entityType, id, values, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  if (
    state[propName].hasData &&
    state[propName].response.currentVersion &&
    state[propName].response.currentVersion.id === id
  ) {
    values = {
      ...state[propName].response.currentVersion,
      ...values
    };
  }

  dispatch(slice.actions.startAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}/${id}`,
      method: 'put',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: values
    });
    dispatch(
      slice.actions.actionSuccess({
        propName,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.actionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeCreate(state, dispatch, slice, propName, entityType, values, endPoint, servuiceUrl) {
  if (state[propName].loading) return;

  dispatch(slice.actions.startAction({ propName }));
  try {
    const response = await axios({
      url: endPoint || `/${entityType}`,
      method: 'post',
      baseURL: servuiceUrl || process.env.REACT_APP_API_URL,
      data: values
    });
    dispatch(
      slice.actions.actionSuccess({
        propName,
        response: response.data
      })
    );
    dispatch(slice.actions.finishedLoading());
  } catch (error) {
    dispatch(
      slice.actions.actionFailed({
        propName,
        response: error
      })
    );
  }
}

export async function executeReset(state, dispatch, slice, propName) {
  if (state[propName].loading) return;
  dispatch(slice.actions.resetAction({ propName }));
}
