const INITIAL_STATE = {
  response: [],
  isFetching: false,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'BEGIN_FETCH':
    return {
      ...state,
      isFetching: true,
    };
  case 'SUCESS_FETCH':
    return {
      ...state,
      response: action.payload.response,
      isFetching: false,
    };
  case 'FAIL_FETCH':
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default trivia;
