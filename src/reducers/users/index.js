export const defStore = {
   '@user1': {},
   '@user2': {},
   '@user3': {},
   '@user4': {},
   '@user5': {},
   '@user6': {}
};

export const types = {
   add: 'USERS_ADD',
   remove: 'USERS_REMOVE'
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
   }
};

export default function(store = defStore, action) {
   const { type } = action;
   const { login } = action;

   if (type === types.add && login && !store[login]) {
      return {
         ...store,
         [login]: {}
      };
   } else if (type === types.remove && login && store[login]) {
      delete store[login];
      return { ...store };
   }

   return store;
};
