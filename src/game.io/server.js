import { GameIoServer } from './server/GameIoServer';

let game;

/**
 * @param {Socket.io} io
 */
export default (io) => {
   if (!game) {
      game = new GameIoServer(io);
   }

   return game;
}
