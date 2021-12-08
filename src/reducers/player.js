const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_PLAYER_SCORE':
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
      score: action.payload.score,
    };
  default:
    return state;
  }
};

export default player;
