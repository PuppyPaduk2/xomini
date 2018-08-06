import { combineReducers } from 'redux';
import userConfig from './userConfig';
import users from './users';
import game from './game';
import rooms from './rooms';

export const client = combineReducers({
   userConfig,
   users,
   game
});

export const server = combineReducers({
   rooms
});
