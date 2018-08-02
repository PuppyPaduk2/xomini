import { types, gameAddUser } from './actions';
import defaultStore from './defaultStore';
import addUser from './addUser';
import removeUser from './removeUser';
import addStep from './addStep';
import userReady from './userReady';

export default function(store = defaultStore(), action) {
   const { type } = action;

   if (type === types.addUser) {
      return addUser(store, action);
   } else if (type === types.removeUser) {
      return removeUser(store, action);
   } else if (type === types.userReady) {
      return userReady(store, action);
   }  else if (type === types.addStep) {
      return addStep(store, action);
   }else if (type === types.updateUsers) {
      return { ...store, users: action.users };
   }

   return store;
};
