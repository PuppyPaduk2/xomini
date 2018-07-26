import { combineReducers } from 'redux';
import changer from './changer';
import changerStore from './changerStore';
import users from './users';
import rooms from './rooms';

export default changerStore({
   users: changer(users),
   rooms
});
