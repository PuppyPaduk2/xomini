import room from 'reducers/room';
import { actions as usersActions } from 'reducers/users';

export const types = {
   create: 'ROOM_CREATE',
   remove: 'ROOM_REMOVE',
   addUser: 'ROOM_ADD_USER',
   removeUser: 'ROOM_REMOVE_USER',
   removeEmpty: 'ROOM_REMOVE_EMPTY'
};

export const actions = {
   create: nameRoom => {
      return {
         type: types.create,
         nameRoom
      };
   },
   remove: nameRoom => {
      return {
         type: types.remove,
         nameRoom
      };
   },
   addUser: (nameRoom, login) => {
      return {
         type: types.addUser,
         nameRoom,
         login
      };
   },
   removeUser: (nameRoom, login) => {
      return {
         type: types.removeUser,
         nameRoom,
         login
      };
   },
   removeEmpty: () => {
      return {
         type: types.removeEmpty
      };
   }
};

export default function(store = {}, action) {
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
      return {
         ...store,
         [nameRoom]: room(store[nameRoom], usersActions.add(login))
      };
   } else if (type === types.removeUser && store[nameRoom]) {
      return {
         ...store,
         [nameRoom]: room(store[nameRoom], usersActions.remove(login))
      };
   } else if (type === types.removeEmpty) {
      Object.keys(store).filter(nameRoom => {
         return !Object.keys(store[nameRoom].users).length;
      }).forEach(nameRoom => {
         delete store[nameRoom];
      });
      return { ...store };
   }

   return store;
};
