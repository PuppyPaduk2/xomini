import { types } from './actions';

export default function(store = defaultUserConfig(), action) {
   const { type } = action;

   if (type === types.setConfig) {
      let { login, signIn } = action;

      login = login === undefined ? store.login : login;

      if (store.signIn !== true) {
         signIn = !!signIn;
      }

      return {
         ...store,
         login,
         signIn
      };
   }

   return store;
};

/**
 * @param {Object} config
 */
function defaultUserConfig() {
   return {
      login: null,
      signIn: false
   };
}