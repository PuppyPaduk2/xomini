import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import gameActions from '../reducers/game/actions';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

serverIo.on('connection', socket => {
   socket.on('addUser:toClient', (action, room) => {
      const login = action.login;

      if (!socket.login) {
         socket.login = login;

         socket.join(room);

         serverIo
            .to(room)
            .emit('addUser:fromClient', action, room);
      }
   });

   socket.on('mergeUsers:toClient', (action, room) => {
      serverIo.to(room).emit('mergeUsers:fromClient', action, room);
   });

   socket.on('userReady:toClient', (action, room) => {
      serverIo.to(room).emit('userReady:fromClient', action, room);
   });

   socket.on('disconnecting', () => {
      const login = socket.login;

      if (login) {
         const socketId = socket.id;

         Object.keys(socket.rooms).reduce((result, room) => {
            if (room !== socketId) {
               return result.to(room);
            } else {
               return result;
            }
         }, serverIo)
            .emit('removeUser:fromServer', gameActions.removeUser(login));
      }
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
