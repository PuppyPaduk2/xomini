import { combineReducers } from 'redux';
import users from './users';
import games from './games';
import game from './game';
import userConfig from './userConfig';

export default combineReducers({
   users,
   games
});

export const gameReducers = combineReducers({
   game,
   userConfig
});
