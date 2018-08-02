import { types } from './actions';
import defaultStore from './defaultStore';

export default function(store = defaultStore, action) {
   const { type } = action;

   if (type === types.setConfig) {
      let { login, room } = action;

      login = login === undefined ? store.login : login;
      room = room === undefined ? store.room : room;

      return {
         ...store,
         login,
         room
      };
   }

   return store;
};
