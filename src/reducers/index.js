import { combineReducers } from 'redux';
import users from './users';
import rooms from './rooms';
import games from './games';

export default combineReducers({
   users,
   games
});
