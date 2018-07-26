export const types = {
   add: 'ADD_USER'
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
   if (action.type === types.add) {
      const login = action.login;

      if (!store[login]) {
         return {
            ...store,
            [login]: {
               room: action.room
            }
         };
      } else {
         action.isExist = true;
      }
   }

   return store;
};

/**
 * @param {Object} params
 * @param {String} params.login
 * @param {String} params.room
 */
export function add(login = null, room = null) {
   return {
      type: 'ADD_USER',
      login,
      room
   };
};
