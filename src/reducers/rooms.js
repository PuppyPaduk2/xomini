import { types as usersTypes } from './users';

export default function(store = {}, action) {
   if (action.type === usersTypes.add && !action.isExist) {
      const { room, login } = action.value;
      let storeRoom = store[room];

      if (storeRoom && storeRoom.users.indexOf(login) === -1) {
         storeRoom.users.push(login);
      } else if (!storeRoom) {
         return {
            ...store,
            [room]: {
               name: room,
               users: [login]
            }
         };
      }
   }

   return store;
};
