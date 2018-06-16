import common from './common';
import { game } from '../../client/game';

const path = '/players';

function signIn(io, socket, params) {
   const room = params.room;

   if (typeof room === 'string' && room !== '') {
      common.namespace(io, room, {

         createNamespace: namespace => {
            namespace.state = game.defaultState();
         },

         connection: (namespace, socket) => {
            const state = namespace.state;

            socket.on('begin', () => {
               if (!state.begin) {
                  state.begin = true;

                  game.nextRound(state);

                  namespace.emit('begin', state);
               }
            });

            return game.players(state, common.getSocketsParams(namespace));
         },

         disconnect: namespace => {
            const state = namespace.state;

            return game.players(state, common.getSocketsParams(namespace));
         }

      });
   }
}

export default function(io) {
   const players = common.namespace(io, path, {
      connection: (namespace, socket) => {
         socket.on('signIn', signIn.bind(this, io, socket));
      }
   });

   return players;
}
