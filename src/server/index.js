import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import games from '../reducers/games';
import gamesActions from '../reducers/games/actions';
import gameActions from '../reducers/game/actions';

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
   });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
