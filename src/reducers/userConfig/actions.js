export const types = {
   setLogin: 'USER_CONFIG_SET_LOGIN',
   setSignIn: 'USER_CONFIG_SIGN_IN',
   setConfig: 'USER_CONFIG'
};

export function setLogin(login) {
   return {
      type: types.setLogin,
      login
   };
};

/**
 * @param {Boolean} signIn
 */
export function setSignIn(signIn) {
   return {
      type: types.setSignIn,
      signIn
   };
};

/**
 * @param {Object} config
 */
export function setConfig(config) {
   return {
      type: types.setConfig,
      ...config
   };
};
