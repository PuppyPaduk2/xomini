import { GameIoServer } from './server/GameIoServer';

let game;

/**
 * @param {Object} options
 */
export default (options) => {
   if (!game) {
      game = new GameIoServer(options);
   }

   return game;
}
