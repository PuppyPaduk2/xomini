import defaultStore from './defaultStore';
import { types } from './actions';
import { types as gameTypes } from '../game/actions';
import addUser from './addUser';
import removeUser from './removeUser';
import changeGame from './changeGame';

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === types.addUser) {
      return addUser(store, action);
   } else if (type === types.removeUser) {
      return removeUser(store, action);
   } else if (type === gameTypes.userReady) {
      return changeGame('userReady', store, action);
   } else if (type === gameTypes.addStep) {
      return changeGame('addStep', store, action);
   }

   return store;
};
