import defaultStore from './defaultStore';
import game from '../game';
import { removeUser } from '../game/actions';

export default function(store = defaultStore, action) {
   const { login } = action;
   const { rooms, users } = store;
   const user = users[login];

   if (user) {
      const room = user.room;
      let storeRoom = rooms[room];

      if (storeRoom) {
         rooms[room] = game(storeRoom, removeUser(login));

         if (storeRoom.end || !Object.keys(storeRoom.users).length) {
            delete rooms[room];
         }
      }

      delete users[login];

      return { ...store };
   }

   return store;
};
