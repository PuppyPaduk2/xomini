import game, { defaultStore } from '../game';
import { gameAddUser } from '../game/actions';

export default function(store = {}, action) {
   const { room, login } = action;
   let storeGame = store[room];

   if (!storeGame) {
      return {
         ...store,
         [room]: defaultStore([login])
      };
   } else if (storeGame) {
      return {
         ...store,
         [room]: game(storeGame, gameAddUser(login))
      };
   }

   return store;
};
