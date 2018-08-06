import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import rooms from 'reducers/rooms';
import { actions as roomsActions } from 'reducers/rooms';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});
const storeApp = createStore(rooms);
const { dispatch } = storeApp;

app.use(express.static(path.join('client')));
app.get('/', main);

dispatch(roomsActions.create('@room1'));
dispatch(roomsActions.create('@room2'));
dispatch(roomsActions.create('@room3'));
dispatch(roomsActions.addUser('@room1', '@user1'));
dispatch(roomsActions.addUser('@room2', '@user2'));
dispatch(roomsActions.removeUser('@room2', '@user2'));
dispatch(roomsActions.removeEmpty());

console.log(storeApp.getState());

serverIo.on('connection', socket => {
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
