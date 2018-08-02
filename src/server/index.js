import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import reducers from '../reducers';
import { addUser, removeUser } from '../reducers/users';
import gameActions, { gameAddUser, gameRemoveUser, gameBegin, gameAddStep } from '../reducers/game/actions';
import { setConfig } from '../reducers/userConfig/actions';

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
   socket.on('inRoom', (login, room) => {
      const actionAddUser = addUser(login, room);

      login = actionAddUser.login;

      if (!store.getState().users[login]) {
         socket.login = login;

         store.dispatch(actionAddUser);

         serverIo.emit(
            'inRoom:result',
            gameActions.updateUsers(store.getState().games[room].users)
         );

         socket.emit('userConfig', setConfig({
            login,
            signIn: true
         }));
      }
   });

   socket.on('user:ready', () => {
      const { login } = socket;

      if (login) {
         const action = gameActions.gameUserReady(login);

         store.dispatch(action);

         serverIo.emit('user:ready:result', action);
      }
   });

   socket.on('disconnect', () => {
      const { login } = socket;

      if (store.getState().users[login]) {
         store.dispatch(removeUser(login));

         serverIo.emit('socket:disconnect', gameRemoveUser(login));
      }
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
