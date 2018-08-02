import defaultStore from './defaultStore';

export default function(store = defaultStore(), action) {
   const { login } = action;
   const { users } = store;

   if (!store.begin && !users[login]) {
      users[login] = {
         ready: false
      };

      return { ...store };
   }

   return store;
};