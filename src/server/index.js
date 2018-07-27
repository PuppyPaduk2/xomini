import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import reducers from '../reducers';
import { addUser, removeUser } from '../reducers/users';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});
const store = createStore(reducers);

app.use(express.static(path.join('client')));
app.use((req, res, next) => {
   req.store = store;
   next();
});
app.get('/', main);

serverIo.on('connection', socket => {
   console.log('@connection');

   socket.on('inRoom', params => {
      const { login } = params;

      socket.login = login;

      if (!store.getState().users[login]) {
         const action = addUser(login, params.room);
         store.dispatch(action);
         serverIo.emit('userJoinInRom', action);
      }
   });

   socket.on('disconnect', () => {
      const { login } = socket;

      if (login) {
         const action = removeUser(login);
         store.dispatch(action);
         serverIo.emit('socket:disconnect', action);
      }
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
