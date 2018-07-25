/**
 * @param {Function} reducer
 * @param {Function[]} [change]
 */
export default function(reducer, change) {
   let prev;

   return (state, action) => {
      const result = reducer.call(this, state, action);

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
};
