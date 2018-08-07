import { types } from '.';

export function create(nameRoom) {
   return {
      type: types.create,
      nameRoom
   };
};

export function remove(nameRoom) {
   return {
      type: types.remove,
      nameRoom
   };
};

export function addUser(nameRoom, login) {
   return {
      type: types.addUser,
      nameRoom,
      login
   };
};

export function removeUser(nameRoom, login) {
   return {
      type: types.removeUser,
      nameRoom,
      login
   };
};

export function removeEmpty(nameRoom) {
   return {
      type: types.removeEmpty
   };
};

export function accessUser(nameRoom, login) {
   return {
      type: types.accessUser,
      nameRoom,
      login,
      access: false
   };
};
