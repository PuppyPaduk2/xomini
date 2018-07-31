import { defaultStore } from './index';

export default function(store = defaultStore(), action) {
   const { login } = action;
   const { users, usersOut } = store;
   const index = users.indexOf(login);

   if (index !== -1) {
      return {
         ...store,
         end: true
      };
   }

   return store;
};