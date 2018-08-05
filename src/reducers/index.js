import { combineReducers } from 'redux';
// import games from './games';
import game from './game';
import userConfig from './userConfig';

export const gameReducers = combineReducers({
   game,
   userConfig
});
