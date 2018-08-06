import { types } from './actions';
import defaultStore from './defaultStore';

export * as actions from './actions';
export * as defaultStore from './defaultStore';

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
         nameRoom: action.nameRoom
      };
   } else if (type === types.reset) {
      return {
         ...defaultStore
      };
   }

   return store;
};
