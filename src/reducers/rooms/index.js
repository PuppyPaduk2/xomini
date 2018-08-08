import room from 'reducers/room';
import { actions as usersActions } from 'reducers/users';

export const defStore = {};

export const types = {
   create: 'ROOM_CREATE',
   remove: 'ROOM_REMOVE',
   addUser: 'ROOM_ADD_USER',
   removeUser: 'ROOM_REMOVE_USER',
   removeEmpty: 'ROOM_REMOVE_EMPTY',
   accessUser: 'ROOM_ACCESS_USER'
};

export * as actions from './actions';

export default function(store = defStore, action) {
   const { type, nameRoom, login } = action;

   if (type === types.create && !store[nameRoom]) {
      return {
         ...store,
         [nameRoom]: room({}, { type: '_' })
      };
   } else if (type === types.remove && store[nameRoom]) {
      delete store[nameRoom];

      return { ...store };
   } else if (type === types.addUser && store[nameRoom]) {
      const roomStore = room(store[nameRoom], usersActions.add(login));

      if (roomStore !== store[nameRoom]) {
         return {
            ...store,
            [nameRoom]: roomStore
         };
      }
   } else if (type === types.removeUser && store[nameRoom]) {
      const roomStore = room(store[nameRoom], usersActions.remove(login));

      if (roomStore !== store[nameRoom]) {
         return {
            ...store,
            [nameRoom]: roomStore
         };
      }
   } else if (type === types.removeEmpty) {
      Object.keys(store).filter(nameRoom => {
         return !Object.keys(store[nameRoom].users).length;
      }).forEach(nameRoom => {
         delete store[nameRoom];
      });

      return { ...store };
   } else if (type === types.accessUser) {
      const storeRoom = store[nameRoom];

      if (!storeRoom || (storeRoom && !storeRoom.users[login])) {
         action.access = true;
      }
   }

   return store;
};
