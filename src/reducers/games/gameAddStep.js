import game from '../game';
import { gameAddStep } from '../game/actions';

export default function(store = {}, action) {
   const { room } = action;
   let storeGame = store[room];

   if (storeGame) {
      storeGame = game(storeGame, gameAddStep(action.login, action.value));
      return {
         ...store,
         [room]: storeGame
      };
   }

   return store;
};
