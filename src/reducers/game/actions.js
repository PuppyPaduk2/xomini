export default {
   types,
   addUser,
   removeUser,
   addStep,
   userReady,
   updateUsers,
   mergeUsers
};

export const types = {
   addUser: 'GAME_ADD_USER',
   removeUser: 'GAME_REMOVE_USER',
   addStep: 'GAME_ADD_STEP',
   userReady: 'GAME_USER_READY',
   updateUsers: 'GAME_UPDATE_USERS',
   mergeUsers: 'GAME_MERGE_USERS'
};

/**
 * @param {String} login
 */
export function addUser(login) {
   return {
      type: types.addUser,
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

/**
 * @param {String} login
 * @param {*} value
 */
export function addStep(login, value) {
   return {
      type: types.addStep,
      login,
      value
   };
};

/**
 * @param {String} login
 */
export function userReady(login) {
   return {
      type: types.userReady,
      login
   };
};

/**
 * @param {Object} users
 */
export function updateUsers(users = {}) {
   return {
      type: types.updateUsers,
      users
   };
};

/**
 * @param {Object} users
 */
export function mergeUsers(users = {}) {
   return {
      type: types.mergeUsers,
      users
   };
};
