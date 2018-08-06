import { combineReducers } from 'redux';
import userConfig from './userConfig';
import users from './users';
import game from './game';

export const client = combineReducers({
   userConfig,
   users,
   game
});
