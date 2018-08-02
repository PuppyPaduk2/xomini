export default {
   types,
   setConfig
}

export const types = {
   setConfig: 'USER_CONFIG'
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
