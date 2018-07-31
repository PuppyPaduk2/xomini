import { types as usersTypes } from '../users';
import { gameTypes } from '../game/actions';
import game from '../game';
import { gameBegin } from '../game/actions';
import addUser from './addUser';
import removeUser from './removeUser';
import gameAddStep from './gameAddStep';

const defaultStore = {};

export default function(store = defaultStore, action) {
   const { type, room } = action;

   if (type === usersTypes.add && !action.isExist) {
      return addUser(store, action);
   } else if (type === usersTypes.remove && action.isExist) {
      return removeUser(store, action);
   } else if (type === gameTypes.begin && store[room]) {
      return {
         ...store,
         [room]: game(store[room], gameBegin(room))
      };
   } else if (type === gameTypes.addStep) {
      return gameAddStep(store, action);
   }

   return store;

};
