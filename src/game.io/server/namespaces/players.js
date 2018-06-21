import Namespace from '../common/Namespace';
import GameNamespace from '../common/GameNamespace';
import CONST from '../../common/const';

function signIn(params) {
   const room = params.room;

   if (typeof room === 'string' && room !== '') {
      const game = new GameNamespace(this.io, CONST.PLAYER_ROOM(room));
   }
}

/**
 * Создать пространство игроков
 * @param {Socket.io} io
 */
export default function(io) {
   return new Namespace(io, CONST.NAMESPANCE_PLAYERS, {
      events: {
         connection: function(socket) {
            socket.on('signin', signIn.bind(this));
         }
      }
   });
}
