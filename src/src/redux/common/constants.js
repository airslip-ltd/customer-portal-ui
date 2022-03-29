export const COMMON_FUNCTIONS = {
  startLoading(state) {
    state.isLoading = true;
  },

  finishedLoading(state) {
    state.isLoading = false;
  }
};

export const STATE_DEFAULTS = {
  isLoading: false,
  error: {}
};

export const REQUEST_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  failed: 'failed'
};

export const REQUEST_DEFAULTS = {
  status: REQUEST_STATES.idle,
  loading: false,
  complete: false,
  hasError: false,
  error: {},
  response: {}
};
