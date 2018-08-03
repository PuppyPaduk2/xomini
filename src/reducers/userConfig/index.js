import { types } from './actions';
import defaultStore from './defaultStore';

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === types.setLogin) {
      return {
         ...store,
         login: store.login ? store.login : action.login
      };
   } else if (type === types.setRoom) {
      return {
         ...store,
         room: action.room
      };
   }

   return store;
};
