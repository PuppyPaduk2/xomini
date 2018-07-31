import { getTypes, typesAll } from './actions/types';
import { gameTypes } from './games/actions';

export const types = getTypes('user');

export default function(store = {}, action) {
   const { type, login, room } = action;

   if (type === types.add) {
      if (!store[login]) {
         return {
            ...store,
            [login]: {
               room
            }
         };
      } else {
         action.isExist = true;
      }
   } else if (type === types.remove) {
      const user = store[login];

      if (user) {
         action.room = user.room;
         action.isExist = true;
         delete store[login];
         return {
            ...store
         };
      }
   } else if (type === gameTypes.step && login && store[login]) {
      action.room = store[login].room;
   } else if (type === typesAll.fetch && action.users) {
      return {
         ...action.users
      };
   }

   return store;
};

/**
 * @param {Object} params
 * @param {String} params.login
 * @param {String} params.room
 */
export function addUser(login = null, room = null) {
   return {
      type: types.add,
      login,
      room
   };
};

export function removeUser(login) {
   return {
      type: types.remove,
      login
   };
};
