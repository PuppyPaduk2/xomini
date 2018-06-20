import common from '../common';

const NAMESPANCE_PLAYERS = '/players';

function signIn(io, socket, params) {
   console.log('signIn >>> ', params);
}

/**
 * Создать пространство игроков
 * @param {Socket.io} io
 */
export default function(io) {
   return common.namespace(io, NAMESPANCE_PLAYERS, {

      connection: params => {
         const socket = params.socket;
         socket.on('signIn', signIn.bind(this, io, socket));
      }

   });
}
