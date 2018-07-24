import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from '../socket-redux.io';
import rootReducer from './reducers';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

var store = createStore(serverIo, rootReducer);

serverIo.on('connection', () => {
   store.dispatch({ type: 'ADD_ROOM', name: '@room' });
   store.dispatch({ type: 'ADD_ROOM', name: '@room' });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
