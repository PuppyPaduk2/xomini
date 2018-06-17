import http from 'http';
import io from 'socket.io';
import players from './http/players';

export default function(app) {
   const server = http.Server(app);
   const httpIo =new io(server, {
      serveClient: false,
      wsEngine: 'ws'
   });

   // players(httpIo);

   return {
      server: server,
      io: httpIo
   };
};
