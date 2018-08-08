export const defaultStore = {
   login: null,
   room: null
};

export const types = {
   setLogin: 'USER_CONFIG_SET_LOGIN',
   setRoom: 'USER_CONFIG_SET_ROOM',
   reset: 'USER_CONFIG_RESET'
};

export const actions = {
   setLogin: login => {
      return {
         type: types.setLogin,
         login: login
      };
   },
   setNameRoom: nameRoom => {
      return {
         type: types.setRoom,
         nameRoom: nameRoom
      };
   },
   reset: () => {
      return {
         type: types.reset
      };
   }
};

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === types.setLogin) {
      return {
         ...store,
         login: store.login ? store.login : action.login
      };
   } else if (type === types.setRoom) {
      return {
         ...store,
         nameRoom: action.nameRoom
      };
   } else if (type === types.reset) {
      return {
         ...defaultStore
      };
   }

   return store;
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
