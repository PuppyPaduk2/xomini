export const types = {
   setLogin: 'USER_CONFIG_SET_LOGIN',
   setRoom: 'USER_CONFIG_SET_ROOM',
   reset: 'USER_CONFIG_RESET'
};

/**
 * @param {strin} login
 */
export function setLogin(login) {
   return {
      type: types.setLogin,
      login: checkNull(login, 'Player')
   };
};

/**
 * @param {@String} nameRoom
 */
export function setRoom(nameRoom) {
   return {
      type: types.setRoom,
      nameRoom: checkNull(nameRoom, 'Room')
   };
};

export function reset() {
   return {
      type: types.reset
   };
};

/**
 * @param {String} value
 * @param {String} [namespace]
 * @param {String} [separator]
 */
function checkNull(value, namespace = '', separator = '#') {
   return (value === null || value === undefined || value === '')
      ? [namespace, new Date().getTime()].join(separator)
      : value;
};
