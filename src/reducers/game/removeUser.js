import { defaultStore } from './index';

export default function(store = defaultStore(), action) {
   const { login } = action;
   const { users } = store;

   if (users[login]) {
      if (store.begin) {
         return {
            ...store,
            end: true
         };
      } else {
         delete users[login];
         return { ...store };
      }
   }

   return store;
};