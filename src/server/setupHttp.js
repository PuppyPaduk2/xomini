import Http from 'http';
import Io from 'socket.io';

export default function(app) {
   const http = Http.Server(app);
   const io = Io(http);

   io.on('connection', function(socket) {
      socket.on('player:selectedColor', function(data) {
         data.player = socket.id;

         io.emit('player:selectedColor', data);
      });
   });

   return http;
};
