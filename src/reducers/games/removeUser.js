import defaultStore from './defaultStore';
import game from '../game';
import { removeUser } from '../game/actions';

// import game from '../game';
// import { gameRemoveUser } from '../game/actions';

export default function(store = defaultStore, action) {
   const { login } = action;
   const { rooms, users } = store;
   let user = users[login];

   if (user) {
      const storeRoom = rooms[user.room];

      if (storeRoom) {
         storeRoom = game(storeRoom, removeUser(login));

         if (storeRoom.end) {

         } else {

         }
      }
   }

   // if (game) {
   //    storeGame = game(storeGame, gameRemoveUser(login));

   //    if (storeGame.end) {
   //       delete store[room];
   //       return { ...store };
   //    } else {
   //       return {
   //          ...store,
   //          [room]: storeGame
   //       };
   //    }
   // }

   return store;
};
