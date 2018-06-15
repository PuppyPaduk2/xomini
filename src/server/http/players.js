function getSocketsParams(players) {
   const sockets = players.sockets;

   return Object.keys(sockets).map(id => {
      return { id: id, name: sockets[id].name };
   });
}

function disconnect(players) {
   players.emit('initDisconnect', getSocketsParams(players));
}

function insertedName(players, socket, name) {
   socket.name = name;
   players.emit('update', getSocketsParams(players));
}

export default function(io) {
   const players = io.of('/players');

   players.on('connection', function(socket) {
      players.emit('initConnection', getSocketsParams(players));

      socket.on('insertedName', insertedName.bind(this, players, socket));

      socket.on('disconnect', disconnect.bind(this, players));
   });

   return io;
}
