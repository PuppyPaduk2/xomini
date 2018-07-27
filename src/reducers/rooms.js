import { types as usersTypes } from './users';

export default function(store = {}, action) {
   const { type } = action;

   if (type === usersTypes.add && !action.isExist) {
      const { room, login } = action;
      let storeRoom = store[room];

      if (storeRoom && storeRoom.users.indexOf(login) === -1) {
         storeRoom.users.push(login);
      } else if (!storeRoom) {
         return {
            ...store,
            [room]: {
               users: [login]
            }
         };
      }
   } else if (type === usersTypes.remove && action.isExist) {
      const roomName = action.room;
      const room = store[roomName];

      if (room) {
         const users = room.users;
         const userIndex = users.indexOf(action.login);

         if (userIndex !== -1) {
            users.splice(userIndex, 1);
         }

         if (!users.length) {
            delete store[roomName];
            return {
               ...store
            };
         }
      }
   }

   return store;
};
