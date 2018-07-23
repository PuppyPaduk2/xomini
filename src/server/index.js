import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import State from '../state.io/static/State';
import Namespace from '../state.io/io/server/Namespace';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

new Namespace(serverIo, {
   'signIn': function(socket, params) {
      const state = this.joinOnce(params.room, {
         count: 0
      }, socket).state;

      state.values = { count: state.values.count + 1 };
   }
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
