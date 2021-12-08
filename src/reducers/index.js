import { combineReducers } from 'redux';
import login from './login';
import trivia from './trivia';
import player from './player';

const rootReducer = combineReducers({
  login,
  trivia,
  player,
});

export default rootReducer;
