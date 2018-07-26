import { combineReducers } from 'redux';
import { changer, changerStore } from '../changer';
import users from './users';
import rooms from './rooms';

export default changerStore({
   users: changer(users),
   rooms
});
