export const defStore = {};

export const types = {
   add: 'USERS_ADD',
   remove: 'USERS_REMOVE',
   update: 'USERS_UPDATE'
};

export const actions = {
   add: (login) => {
      return {
         type: types.add,
         login
      };
   },
   remove: (login) => {
      return {
         type: types.remove,
         login
      };
   },
   update: (users = {}) => {
      return {
         type: types.update,
         users
      };
   }
};

export default function(store = defStore, action) {
   const { type } = action;
   const { login } = action;

   if (type === types.add && login && !store[login]) {
      return {
         ...store,
         [login]: {
            game: null
         }
      };
   } else if (type === types.remove && login && store[login]) {
      delete store[login];
      return { ...store };
   } else if (type === types.update) {
      const { users } = action;

      return {
         ...users
      };
   }

   return store;
};
