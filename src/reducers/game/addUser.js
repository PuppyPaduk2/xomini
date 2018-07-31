import { defaultStore } from './index';

export default function(store = defaultStore(), action) {
   const { login } = action;
   const { users } = store;

   if (!store.begin && users.indexOf(login) === -1) {
      users.push(login);

      return { ...store };
   }

   return store;
};