import game from '../game';
import gameActions from '../game/actions';

/**
 * @param {String} nameAction
 * @param {Object} store
 * @param {Object} action
 */
export default function(nameAction, store = {}, action) {
   const { room } = action;
   let storeGame = room && store[room];
   const gameAction = gameActions[nameAction];

   if (storeGame && gameAction) {
      storeGame = game(storeGame, gameAction(action.login, action.value));

      return {
         ...store,
         [room]: storeGame
      };
   }

   return store;
};