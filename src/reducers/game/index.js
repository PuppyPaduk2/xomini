import { gameTypes, gameAddUser } from './actions';
import addUser from './addUser';
import removeUser from './removeUser';
import addStep from './addStep';

export default function(store = defaultStore(), action) {
   const { type } = action;

   if (type === gameTypes.addUser) {
      return addUser(store, action);
   } else if (type === gameTypes.removeUser) {
      return removeUser(store, action);
   } else if (type === gameTypes.begin && Object.keys(store.users).length > 1) {
      return {
         ...store,
         begin: true
      };
   } else if (type === gameTypes.addStep) {
      return addStep(store, action);
   }

   return store;
};

/**
 * @param {String[]} logins
 */
export function defaultStore(logins = []) {
   let result = {
      users: {},
      begin: false,
      end: false,
      state: [],
      step: null,
      point: 0,
      summPoints: 0
   };

   if (logins instanceof Array && logins.length) {
      logins.forEach(login => {
         result = addUser(result, gameAddUser(login));
      });
   }

   return result;
};
