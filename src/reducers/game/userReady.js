import { defaultStore } from './index';

export default function(store = defaultStore(), action) {
   const { users } = store;
   const user = users[action.login];

   if (user) {
      user.ready = true;
   }

   return {
      ...store,
      begin: isBegin(users)
   };
};

function isBegin(users) {
   return Object.keys(users).reduce((result, key) => {
      return result && users[key].ready;
   }, true);
};
