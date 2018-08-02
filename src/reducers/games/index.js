import { types as usersTypes } from '../users';
import { gameTypes, gameBegin } from '../game/actions';
import game from '../game';
import addUser from './addUser';
import removeUser from './removeUser';
import changeGame from './changeGame';

const defaultStore = {};

export default function(store = defaultStore, action) {
   const { type, room } = action;

   if (type === usersTypes.add && !action.isExist) {
      return addUser(store, action);
   } else if (type === usersTypes.remove && action.isExist) {
      return removeUser(store, action);
   } else if (type === gameTypes.begin && store[room]) {
      return changeGame('gameBegin', store, action);
   } else if (type === gameTypes.addStep) {
      return changeGame('gameAddStep', store, action);
   } else if (type === gameTypes.userReady) {
      return changeGame('gameUserReady', store, action);
   }

   return store;

};
