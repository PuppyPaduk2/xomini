import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import games from '../reducers/games';
import gamesActions from '../reducers/games/actions';
import gameActions from '../reducers/game/actions';
import userConfigActions from '../reducers/userConfig/actions';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

const store = createStore(games);

serverIo.on('connection', socket => {
   socket.on('inRoom', (login, room) => {
      if (!socket.userConfig) {
         const addUserAction = gamesActions.addUser(room, login);

         room = addUserAction.room;
         login = addUserAction.login;

         store.dispatch(addUserAction);

         const state = store.getState();

         socket.userConfig = state.users[login];

         serverIo.emit('inRoom:result', gameActions.updateUsers(state.rooms[room].users));

         socket.emit(
            'userConfig',
            userConfigActions.setConfig(socket.userConfig)
         );
      }
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
