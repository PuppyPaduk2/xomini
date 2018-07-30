export const typesAll = {
   fetch: 'FETCH_ALL'
};

/**
 * @param {String} namespace
 */
export function getTypes(namespace) {
   namespace = namespace.toLocaleUpperCase();

   return {
      add: 'ADD_' + namespace,
      remove: 'REMOVE_' + namespace
   };
};
