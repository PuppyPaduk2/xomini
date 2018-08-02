export default {
   gameTypes,
   gameAddUser,
   gameRemoveUser,
   gameBegin,
   gameAddStep,
   gameUserReady,
   updateUsers
};

export const gameTypes = {
   addUser: 'GAME_ADD_USER',
   removeUser: 'GAME_REMOVE_USER',
   begin: 'GAME_BEGIN',
   addStep: 'GAME_ADD_STEP',
   userReady: 'GAME_USER_READY',
   updateUsers: 'GAME_UPDATE_USERS'
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

/**
 * @param {String} login
 */
export function gameUserReady(login) {
   return {
      type: gameTypes.userReady,
      login
   };
};

/**
 * @param {Object} users
 */
export function updateUsers(users = {}) {
   return {
      type: gameTypes.updateUsers,
      users
   };
};
