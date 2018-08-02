export default {
   types,
   addUser,
   removeUser
};

export const types = {
   addUser: 'GAMES_ADD_USER',
   removeUser: 'GAMES_REMOVE_USER'
};

/**
 * @param {String} room
 * @param {String} login
 */
export function addUser(room, login) {
   return {
      type: types.addUser,
      room,
      login
   };
};

/**
 * @param {String} login
 */
export function removeUser(login) {
   return {
      type: types.removeUser,
      login
   };
};
