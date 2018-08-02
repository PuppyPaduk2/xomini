import defaultStore from './defaultStore';
import { types } from './actions';
import { types as gameTypes } from '../game/actions';
import addUser from './addUser';

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === types.addUser) {
      return addUser(store, action);
   } else if (type === types.removeUser) {
   } else if (type === gameTypes.begin) {
   } else if (type === gameTypes.addStep) {
   } else if (type === gameTypes.userReady) {
   }

   // if (type === usersTypes.add && !action.isExist) {
   //    return addUser(store, action);
   // } else if (type === usersTypes.remove && action.isExist) {
   //    return removeUser(store, action);
   // } else if (type === gameTypes.begin && store[room]) {
   //    return changeGame('gameBegin', store, action);
   // } else if (type === gameTypes.addStep) {
   //    return changeGame('gameAddStep', store, action);
   // } else if (type === gameTypes.userReady) {
   //    return changeGame('gameUserReady', store, action);
   // }

   return store;
};
