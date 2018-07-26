import { combineReducers } from 'redux';

/**
 * @param {Object} changers
 * @param {Object} callbacks
 */
export default function(changers, callbacks = {}) {
   const reducers = combineReducers(Object.keys(changers).reduce((result, key) => {
      const changer = changers[key];

      if (changer.reducer) {
         result[key] = changer.reducer;
         changer.subscribe(callbacks[key]);
      } else {
         result[key] = changer;
      }

      return result;
   }, {}));

   return {
      reducers,
      /**
       * @param {String} nameProp
       * @param {Function|Function[]} ...callbacks
       */
      subscribe: (nameProp, ...callbacks) => {
         if (isChanger(nameProp, changers)) {
            changers[nameProp].subscribe(...callbacks);
         }
      },
      /**
       * @param {String} nameProp
       * @param {Function|Function[]} ...callbacks
       */
      unsubscribe: (nameProp, ...callbacks) => {
         if (isChanger(nameProp, changers)) {
            changers[nameProp].unsubscribe(...callbacks);
         }
      }
   };
};

/**
 * @param {String} nameProp
 * @param {Object} changers
 */
function isChanger(nameProp, changers) {
   return !!(typeof nameProp === 'string'
      && changers[nameProp]
      && changers[nameProp].subscribe);
}
