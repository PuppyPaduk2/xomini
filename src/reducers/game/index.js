import { gameTypes } from './actions';
import addUser from './addUser';
import removeUser from './removeUser';
import addStep from './addStep';

export default function(store = defaultStore(), action) {
   const { type } = action;

   if (type === gameTypes.addUser) {
      return addUser(store, action);
   } else if (type === gameTypes.removeUser) {
      return removeUser(store, action);
   } else if (type === gameTypes.begin) {
      if (store.users.length > 1) {
         return {
            ...store,
            begin: true
         };
      }
   } else if (type === gameTypes.addStep) {
      return addStep(store, action);
   }

   return store;
};

/**
 * @param {String[]} logins
 */
export function defaultStore(logins = []) {
   const result = {
      users: [],
      begin: false,
      end: false,
      state: [],
      step: null,
      point: 0,
      summPoints: 0
   };

   if (logins instanceof Array) {
      result.users = result.users.concat(logins);
   }

   return result;
};
