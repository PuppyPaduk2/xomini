import { combineReducers } from 'redux';
import prevStateReducer from './prevStateReducer';
import users from './users';
import rooms from './rooms';

/**
 * @param {Object} [change]
 */
export function prevStateReducers(change = {}) {
   return combineReducers({
      users: prevStateReducer(users, change.users),
      rooms
   });
};

/**
 * @param {Socket} socket
 */
export default prevStateReducers();
