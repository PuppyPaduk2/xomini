import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import State from '../state.io/static/State';
import { join, leave, has} from '../state.io/io/server/common';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);


serverIo.on('connection', (socket) => {

   socket.on('signIn', params => {
      let room = has(serverIo, params.room);

      if (!room) {
         room = join(serverIo, params.room, new State({
            count: 0
         }), socket);
      }

      let state = room.state;

      state.values = { count: state.values.count + 1 };
   });

   socket.on('disconnecting', () => {
      if (socket.roomsState) {
         Object.keys(socket.roomsState).forEach(nameRoom => {
            leave(serverIo, nameRoom, socket);
         });
      }
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
