/**
 * @param {Function} defReducer
 * @param {Function|Function[]} [...callbacks]
 */
export default function(defReducer, ...callbacks) {
   let change = getCallbacksByArgs(callbacks);
   let prev;
   let reducer = (state, action) => {
      const result = defReducer.call(this, state, action);

      if (!action.type.match(/@@redux/g)) {
         if (prev !== result) {
            if (change instanceof Array) {
               change.forEach(callback => {
                  if (callback instanceof Function) {
                     callback.call(this, action);
                  }
               });
            }

            prev = result;
         }
      } else {
         prev = result;
      }

      return result;
   };

   return {
      reducer,
      /**
       * @param {Function|Function[]} ...callbacks
       */
      subscribe: (...callbacks) => {
         change = getCallbacksByArgs(callbacks);
      },
      /**
       * @param {Function|Function[]} ...callbacks
       */
      unsubscribe: (...callbacks) => {
         callbacks.forEach(cbs => {
            change = checkCallbacks(cbs).map(callback => {
               return change.indexOf(callback) !== -1
                  ? undefined
                  : callback;
            }).filter(callback => callback == undefined);
         });
      }
   };
};

/**
 * @param {Array} callbacks
 */
function getCallbacksByArgs(callbacks) {
   return callbacks.reduce((result, cbs) => {
      return result.concat(checkCallbacks(cbs));
   }, []);
};

/**
 * @param {Function|Function[]} callbacks
 */
function checkCallbacks(callbacks) {
   if (callbacks instanceof Function) {
      callbacks = [callbacks];
   }

   if (!(callbacks instanceof Array)) {
      return [];
   } else {
      return callbacks;
   }
};

