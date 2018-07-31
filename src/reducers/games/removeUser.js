import game from '../game';
import { gameRemoveUser } from '../game/actions';

export default function(store = {}, action) {
   const { room, login } = action;
   let storeGame = store[room];

   if (game) {
      storeGame = game(storeGame, gameRemoveUser(login));

      if (storeGame.end) {
         delete store[room];
         return { ...store };
      } else {
         return {
            ...store,
            [room]: storeGame
         };
      }
   }

   return store;
};
