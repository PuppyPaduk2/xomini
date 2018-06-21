import Notify from '../common/Notify';
import Socket from './common/Socket';
import GameSocket from './common/GameSocket';
import CONST from '../common/const';

/**
 * Основной класс клиентской части game.io
 */
export default class GameIoClient extends Notify {

   /**
    * @param {Object} [options]
    */
   constructor(options) {
      super(options);

      options = options instanceof Object ? options : {};

      this.players = new Socket(CONST.NAMESPANCE_PLAYERS);
   };

   /**
    * @param {Object} params
    */
   signIn(params) {
      this.players.socket.emit('signin', params);

      if (!this.game) {
         this.game = new GameSocket(CONST.PLAYER_ROOM(params.room), {
            io: { query: params },

            events: {
               connection: function(state) {
                  console.log('connection >>> ', state);
               },

               disconnect: function(state) {
                  console.log('disconnect >>> ', state);
               }
            }
         });
      }

      return this;
   };

}
