import Notify from '../common/Notify';
import express, { Router } from 'express';
import http from 'http';
import io from 'socket.io';
import Namespace from './Namespace';

const PORT = 3000;
const IO_OPTIONS = {
   serveClient: false,
   wsEngine: 'ws'
};
const NAMESPANCE_PLAYERS = '/players';

/**
 * Основной класс серверной части game.io
 */
export class GameIoServer extends Notify {

   /**
    * @param {Object} options
    * @param {Number} [options.port]
    * @param {Object} [options.ioOptions]
    * @param {String[]} [options.static]
    * @param {Router[]} [options.routers]
    */
   constructor(options) {
      super(options);

      options = options instanceof Object ? options : {};

      this.app = express();
      this.server = http.Server(this.app);
      this.io = new io(this.server, options.ioOptions || IO_OPTIONS);
      this.port = options.port || PORT;

      if (options.static instanceof Array) {
         options.static.forEach(path => this.app.use(express.static(path)));
      }

      if (options.routers instanceof Array) {
         options.routers.forEach(router => this.app.use(router));
      }

      this.players = new Namespace(this.io, NAMESPANCE_PLAYERS);

      this.emit('init');
   };

   run() {
      this.server.listen(this.port, (...args) => {
         this.emit('run', ...args);
      });

      return this;
   }

}
