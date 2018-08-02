import defaultStore from './defaultStore';
import game from '../game';
import gameDefaultStore from '../game/defaultStore';
import { addUser } from '../game/actions';

export default function(store = defaultStore, action) {
   const { room, login } = action;
   const { rooms, users } = store;
   let user = users[login];
   let storeRoom = rooms[room];

   if (!user) {
      users[login] = { room };

      if (!storeRoom) {
         storeRoom = gameDefaultStore();
         rooms[room] = storeRoom;
      }
   
      game(storeRoom, addUser(login));

      return { ...store };
   }

   return store;
};
