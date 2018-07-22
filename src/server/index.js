import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import socketConnection from './socket';
import Namespace from '../state.io/io/server/Namespace';
import StaticState from '../state.io/static/State';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

let state = new StaticState({
   count: 0
});

new Namespace(serverIo, {
   handlers: {
      signIn: (socket, params) => {
         socket.join(params.room, state);
         state.values = { count: state.values.count + 1 };
      }
   }
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
