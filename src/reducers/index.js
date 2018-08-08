import { combineReducers } from 'redux';
import userConfig from './userConfig';
import users from './users';
import game from './game';
import rooms from './rooms';
import socket from './socket';


export const client = combineReducers({
   userConfig,
   users,
   game,
   socket
});

export const server = combineReducers({
   rooms
});
