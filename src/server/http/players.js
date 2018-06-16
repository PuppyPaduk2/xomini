function getSockets(players) {
   const sockets = players.sockets;
   return {
      sockets: sockets,
      ids: Object.keys(sockets)
   };
}

function getSocketsParams(players) {
   const {sockets, ids} = getSockets(players);

   return ids.map(id => {
      return { id: id, name: sockets[id].name };
   });
}

function disconnect(players) {
   players.emit('initDisconnect', getSocketsParams(players));
}

function signIn(players, socket, params) {
   socket.name = params.name
      || 'Player ' + (getSockets(players).ids.indexOf(socket.id) + 1);
   players.emit('update', getSocketsParams(players));
}

export default function(io) {
   const players = io.of('/players');

   players.on('connection', function(socket) {
      players.emit('initConnection', getSocketsParams(players));

      socket.on('signIn', signIn.bind(this, players, socket));

      socket.on('disconnect', disconnect.bind(this, players));
   });

   return io;
}
