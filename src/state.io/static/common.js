export function defProp(...args) {
   Object.defineProperty(...args);
};

/**
 * @param {Object} context
 * @param {Object} props
 */
export function defProps(context, props = {}) {
   Object.keys(props).forEach((nameProp) => {
      defProp(context, nameProp, props[nameProp]);
   });
};
