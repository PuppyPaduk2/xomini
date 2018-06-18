import { game as gameClient } from '../client/game';

export const game = {

   /**
    * @param {Namespace} namespace
    * @param {String} room
    * @return {gameState}
    */
   defaultState: function(namespace, room) {
      const nGame = namespace.game;
      let gameState;

      if (!nGame[room]) {
         gameState = gameClient.defaultState();
         nGame[room] = gameState;
      } else {
         gameState = nGame[room];
      }

      return gameState;
   }

};
