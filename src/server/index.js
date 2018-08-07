import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import rooms from 'reducers/rooms';

import { actions as userConfigActions } from 'reducers/userConfig';
import { actions as roomsActions } from 'reducers/rooms';
import { actions as usersActions } from 'reducers/users';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});
const storeApp = createStore(rooms);
const { dispatch, subscribe } = storeApp;

app.use(express.static(path.join('client')));
app.get('/', main);

const removeUser = (socket) => {
   const { nameRoom, login } = socket;

   if (nameRoom && login) {
      dispatch(roomsActions.removeUser(nameRoom, login));

      socket.emit(
         'actions',
         userConfigActions.reset()
      );

      console.log(storeApp.getState()[nameRoom].users);

      serverIo.to(nameRoom).emit(
         'actions',
         usersActions.update(
            storeApp.getState()[nameRoom].users
         )
      );

      dispatch(roomsActions.removeEmpty(nameRoom));
   }
};

serverIo.on('connection', socket => {
   socket.on('rooms#create', (nameRoom, login) => {
      const accessUserAct = roomsActions.accessUser(nameRoom, login);

      dispatch(accessUserAct);

      if (accessUserAct.access) {
         socket.nameRoom = nameRoom;
         socket.login = login;
         socket.join(nameRoom);

         dispatch(roomsActions.create(nameRoom));
         dispatch(roomsActions.addUser(nameRoom, login));

         socket.emit(
            'actions',
            userConfigActions.setNameRoom(nameRoom),
            userConfigActions.setLogin(login)
         );

         serverIo.to(nameRoom).emit(
            'actions',
            usersActions.update(
               storeApp.getState()[nameRoom].users
            )
         );
      }

      socket.emit('rooms#create:result', accessUserAct.access);
   });

   socket.on('rooms#removeUser', () => {
      removeUser(socket);
   });

   socket.on('disconnecting', () => {
      removeUser(socket);
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
