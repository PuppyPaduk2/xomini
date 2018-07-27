export const types = {
   add: 'ADD_USER',
   remove: 'REMOVE_USER'
};

/**
 * @param {Object} params
 * @param {String} params.login
 * @param {String} params.room
 */
function createUser(params) {
   const { login, room } = params;
   return { login, room };
};

export default function(store = {}, action) {
   const { type, login, room } = action;

   if (type === types.add) {

      if (!store[login]) {
         return {
            ...store,
            [login]: {
               room
            }
         };
      } else {
         action.isExist = true;
      }
   } else if (type === types.remove) {
      const user = store[login];

      if (user) {
         action.room = user.room;
         action.isExist = true;
         delete store[login];
         return {
            ...store
         };
      }
   }

   return store;
};

/**
 * @param {Object} params
 * @param {String} params.login
 * @param {String} params.room
 */
export function addUser(login = null, room = null) {
   return {
      type: types.add,
      login,
      room
   };
};

export function removeUser(login) {
   return {
      type: types.remove,
      login
   };
};
