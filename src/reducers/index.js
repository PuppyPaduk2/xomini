import { combineReducers } from 'redux';
import users from './users';
import rooms from './rooms';

export default combineReducers({
   users,
   rooms
});
