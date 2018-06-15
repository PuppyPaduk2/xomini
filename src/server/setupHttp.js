import Http from 'http';
import Io from 'socket.io';
import players from './http/players';

export default function(app) {
   const http = Http.Server(app);
   const io = Io(http);

   players(io);

   return {
      http: http,
      io: io
   };
};
