import { combineReducers } from 'redux';
import prevStateReducer from './prevStateReducer';
import users from './users';
import rooms from './rooms';

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

/**
 * @param {Object} object
 * @param {Array} props
 */
function createArrayCallbacks(object, props) {
   let result = {};

   if (object instanceof Object
   && props instanceof Array && props.length) {
      props.forEach(nameProp => {
         result[nameProp] = checkCallbacks(object[nameProp]);
      });
   }

   return result;
}

/**
 * @param {Object} [change]
 */
export function changerStore(change = {}) {
   change = createArrayCallbacks(change, [
      'users', 'rooms'
   ]);

   const reducers = combineReducers({
      users: prevStateReducer(users, change.users),
      rooms
   });

   return {
      reducers,
      /**
       * @param {String} nameProp
       * @param {Function|Function[]} callbacks
       */
      subscribe: (nameProp, ...args) => {
         if (typeof nameProp === 'string'
         && change[nameProp] instanceof Array) {
            args.forEach(callbacks => {
               change[nameProp] = change[nameProp]
                  .concat(checkCallbacks(callbacks));
            });
         }
      },
      /**
       * @param {String} nameProp
       * @param {Function|Function[]} callbacks
       */
      unsubscribe: (nameProp, ...args) => {
         const changeCb = change[nameProp];

         if (typeof nameProp === 'string'
         && changeCb instanceof Array) {
            args.forEach(callbacks => {
               checkCallbacks(callbacks).map(callback => {
                  return changeCb.indexOf(callback);
               }).forEach(index => {
                  changeCb.splice(index, 1);
               });
            });

            console.log(change)
         }
      }
   };
};
