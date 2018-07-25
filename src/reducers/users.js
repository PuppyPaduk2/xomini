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
   const value = action.value;

   if (action.type === types.add) {
      if (!store[value.login]) {
         return { ...store, [value.login]: value };
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
export function add(params) {
   return {
      type: 'ADD_USER',
      value: createUser(params)
   };
};
