import { createStore as reduxCreateStore, combineReducers as reduxCombineReducers } from 'redux';

/**
 * @param {Namespace} namespace
 * @param {String} name
 * @param {Function} reducer
 */
function addReducer(namespace, name, reducer) {
   let statePrev;

   return (state, action) => {
      let result = reducer.call(this, state, action);

      if (!action.type.match(/@@redux/g)) {
         if (statePrev !== result) {
            statePrev = result;

            console.log('@change')

            namespace.emit('store:change', name, result);
         }
      } else {
         statePrev = result;
      }

      return result;
   };
};

/**
 * @param {Namespace} namespace
 * @param {Object} reducers
 */
export function combineReducers(namespace, reducers) {
   return reduxCombineReducers(reducers);

   reducers = Object.keys(reducers).reduce((result, key) => {
      result[key] = addReducer(namespace, key, reducers[key]);

      return result;
   }, {});

   return reduxCombineReducers(reducers);
};

/**
 * @param {Namespace} namespace
 * @param {Function|Object} reducers
 */
export function createStore(namespace, reducers) {
   if (!namespace.store) {
      reducers = reducers instanceof Object
         ? combineReducers(namespace, reducers)
         : addReducer(namespace, '/', reducers);

      namespace.store = reduxCreateStore(reducers);

      namespace.store.subscribe(() => {
         console.log('@change', namespace.store.getState());
      });
   }

   return namespace.store;
};
