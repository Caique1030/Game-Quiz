const INITIAL_STATE = {
  user: '',
  email: '',
  arrayOfUser: [],
  arrayOfScore: [],
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_LOGIN':
    return {
      ...state,
      user: action.payload.user,
      email: action.payload.email,
    };
  case 'ARRAY_SCORE':
    return {
      ...state,
      arrayOfScore: [...state.arrayOfScore, action.score],
    };
  default:
    return state;
  }
};

export default login;
