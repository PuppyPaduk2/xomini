import { combineReducers } from 'redux';
import userConfig from './userConfig';
import users from './users';

export const client = combineReducers({
   userConfig,
   users
});
