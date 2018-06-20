import nPlayers from './namespaces/players';

const PORT = 3000;

/**
 * Основной класс серверной части game.io
 */
export class GameIoServer {
   io;
   players;

   /**
    * @param {Object} options
    * @param {Number} [options]
    */
   constructor(options) {
      options = options instanceof Object ? options : {};

      const port = options.port || PORT;

      this.io = io;
      this.players = nPlayers(io);
   };

}
