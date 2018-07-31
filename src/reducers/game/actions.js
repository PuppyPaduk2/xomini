export const gameTypes = {
   addUser: 'GAME_ADD_USER',
   removeUser: 'GAME_REMOVE_USER',
   begin: 'GAME_BEGIN',
   addStep: 'GAME_ADD_STEP'
};

/**
 * @param {String} login
 */
export function gameAddUser(login) {
   return {
      type: gameTypes.addUser,
      login
   };
};

/**
 * @param {String} login
 */
export function gameRemoveUser(login) {
   return {
      type: gameTypes.removeUser,
      login
   };
};

/**
 * @param {String} room
 */
export function gameBegin(room) {
   return {
      type: gameTypes.begin,
      room
   };
};

/**
 * @param {String} login
 * @param {*} value
 */
export function gameAddStep(login, value) {
   return {
      type: gameTypes.addStep,
      login,
      value
   };
};
