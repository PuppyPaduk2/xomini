import common from './common';

const path = '/players';

function signIn(io, socket, params) {
   const room = params.room;
   const name = params.name;

   if (typeof name === 'string' && name !== '') {
      socket.name = name;
   }

   if (typeof room === 'string' && room !== '') {
      common.namespace(io, room);
   }
}

export default function(io) {
   const players = common.namespace(io, path, function(players, socket) {
      socket.on('signIn', signIn.bind(this, io, socket));
   });

   return players;
}
