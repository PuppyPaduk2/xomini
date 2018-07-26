import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import changerStore from '../reducers';
import { add as addUser } from '../reducers/users';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

const store = createStore(changerStore.reducers);

serverIo.on('connection', socket => {
   console.log('@connection');

   const changeUsers = () => {
      console.log('@changeUsers');
   };
   const changeTest = () => {
      console.log('@changeTest');
   };

   changerStore.subscribe('users', changeUsers);
   changerStore.subscribe('test', changeTest);
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
