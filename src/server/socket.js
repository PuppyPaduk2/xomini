import io from 'socket.io';
import { createStore } from 'redux';
import namespace from './namespace';

import rooms from 'reducers/rooms';
import { actions as userConfigActions } from 'reducers/userConfig';
import { actions as roomsActions } from 'reducers/rooms';
import { actions as usersActions } from 'reducers/users';

export default function(httpServer) {
   const server = new io(httpServer, {
      serveClient: false,
      wsEngine: 'ws'
   });
   const store = createStore(rooms);

   namespace(server, {
      'rooms#create': (common, nameRoom, login) => {
         const { socket, socketEmit, namespaceEmit, dispatch, getState } = common;
         const accessUserAct = roomsActions.accessUser(nameRoom, login);

         dispatch(accessUserAct);

         if (accessUserAct.access) {
            socket.nameRoom = nameRoom;
            socket.login = login;

            socket.join(nameRoom);

            dispatch(roomsActions.create(nameRoom));
            dispatch(roomsActions.addUser(nameRoom, login));

            socketEmit([
               userConfigActions.setNameRoom(nameRoom),
               userConfigActions.setLogin(login)
            ]);

            namespaceEmit([
               usersActions.update(getState()[nameRoom].users)
            ], nameRoom);
         }

         return {
            result: accessUserAct.access
         };
      },
      'rooms#removeUser': common => removeUser(common),
      'disconnecting': common => removeUser(common)
   }, {
      store
   });
};

function removeUser(common) {
   const { socket, socketEmit, namespaceEmit, dispatch, getState } = common;
   const { nameRoom, login } = socket;

   if (nameRoom && login) {
      dispatch(roomsActions.removeUser(nameRoom, login));

      socketEmit([userConfigActions.reset()]);

      namespaceEmit([
         usersActions.update(getState()[nameRoom].users)
      ], nameRoom);

      dispatch(roomsActions.removeEmpty(nameRoom));
   }
};
