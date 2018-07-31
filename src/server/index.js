import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import reducers from '../reducers';
import { addUser, removeUser } from '../reducers/users';
import { gameBegin, gameAddStep } from '../reducers/game/actions';

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

store.dispatch(addUser('@user', '@game'));
store.dispatch(gameBegin('@game'));
store.dispatch(addUser('@user2', '@game'));
store.dispatch(gameBegin('@game'));
// store.dispatch(removeUser('@user', '@game'));
// store.dispatch(removeUser('@user2', '@game'));

store.dispatch(gameAddStep('@user', '#000'));
store.dispatch(gameAddStep('@user2', '#000'));
store.dispatch(gameAddStep('@user2', '#000'));
store.dispatch(gameAddStep('@user', '#010'));
// store.dispatch(removeUser('@user2'));
store.dispatch(gameAddStep('@user', '#FFF'));
store.dispatch(gameAddStep('@user', '#FFF'));
store.dispatch(gameAddStep('@user', '#FFF'));
store.dispatch(gameAddStep('@user', '#FFF'));
store.dispatch(gameAddStep('@user2', '#FFF'));

console.log(store.getState().games['@game']);

serverIo.on('connection', socket => {
   console.log('@connection');
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
