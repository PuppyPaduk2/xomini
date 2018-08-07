import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import rooms from 'reducers/rooms';
import namespace from './namespace';

// import { actions as userConfigActions } from 'reducers/userConfig';
// import { actions as roomsActions } from 'reducers/rooms';
// import { actions as usersActions } from 'reducers/users';

const PORT = 3000;
const app = express();
const httpServer = http.Server(app);
const server = new io(httpServer, {
   serveClient: false,
   wsEngine: 'ws'
});
const store = createStore(rooms);

app.use(express.static(path.join('client')));
app.get('/', main);

namespace(server, {
   'rooms#create': function(...args) {
      console.log('@rooms#create', ...args)
   }
});

// function removeUser(namespace, socket, store) {
//    const { dispatch } = store;
//    const { nameRoom, login } = socket;

//    if (nameRoom && login) {
//       dispatch(roomsActions.removeUser(nameRoom, login));

//       socket.emit(
//          'actions',
//          userConfigActions.reset()
//       );

//       namespace.to(nameRoom).emit(
//          'actions',
//          usersActions.update(
//             store.getState()[nameRoom].users
//          )
//       );

//       dispatch(roomsActions.removeEmpty(nameRoom));
//    }
// };

// serverIo.on('connection', socket => {
//    socket.on('rooms#create', (nameRoom, login) => {
//       const accessUserAct = roomsActions.accessUser(nameRoom, login);

//       dispatch(accessUserAct);

//       if (accessUserAct.access) {
//          socket.nameRoom = nameRoom;
//          socket.login = login;
//          socket.join(nameRoom);

//          dispatch(roomsActions.create(nameRoom));
//          dispatch(roomsActions.addUser(nameRoom, login));

//          socket.emit(
//             'actions',
//             userConfigActions.setNameRoom(nameRoom),
//             userConfigActions.setLogin(login)
//          );

//          serverIo.to(nameRoom).emit(
//             'actions',
//             usersActions.update(
//                storeApp.getState()[nameRoom].users
//             )
//          );
//       }

//       socket.emit('rooms#create:result', accessUserAct.access);
//    });

//    socket.on('rooms#removeUser', () => {
//       removeUser(socket);
//    });

//    socket.on('disconnecting', () => {
//       removeUser(socket);
//    });
// });

httpServer.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
