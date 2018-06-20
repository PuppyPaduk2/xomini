import http from 'http';
import io from 'socket.io';
import players from './http/players';

export default function(app) {
   const server = http.Server(app);
   const serverIo = new io(server, {
      serveClient: false,
      wsEngine: 'ws'
   });

   // players(serverIo);

   return {
      server: server,
      io: serverIo
   };
};
