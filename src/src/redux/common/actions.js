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
