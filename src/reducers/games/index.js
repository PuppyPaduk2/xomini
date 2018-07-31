import { types as usersTypes } from '../users';
import { typesAll } from '../actions/types';
import addUser from './addUser';
import removeUser from './removeUser';
import { gameTypes } from './actions';
import gameStep from './gameStep';

const defaultStore = {};

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === usersTypes.add && !action.isExist) {
      return addUser(store, action);
   } else if (type === usersTypes.remove && action.isExist) {
      return removeUser(store, action);
   } else if (type === gameTypes.begin && store[action.room]) {
      store[action.room].begin = true;
   } else if (type === gameTypes.step) {
      return gameStep(store, action);
   } else if (type === typesAll.fetch && action.games) {
      return { ...action.games };
   }

   return store;

};
