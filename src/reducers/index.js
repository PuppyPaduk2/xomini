import { combineReducers } from 'redux';
import changer from './changer';
import changerStore from './changerStore';
import users from './users';
import rooms from './rooms';
import test from './test';

export default changerStore({
   users: changer(users),
   rooms,
   test: test
});
