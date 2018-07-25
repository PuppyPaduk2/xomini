import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import { changerStore } from '../reducers';
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

let socket1 = null;
const handlers = [action => {
   console.log('@user:change');
}, action => {
   console.log('@user:change:1');
}];
const changer = changerStore({
   users: handlers
});
const store = createStore(changer.reducers);

serverIo.on('connection', socket => {
   console.log('@connection');

   socket1 = socket;

   const params = { room: 'MyRoom', login: '@myLogin' };
   const cb = action => {
      console.log('@connection:change');
   };

   changer.subscribe('users', cb);
   changer.unsubscribe('users', handlers, cb);

   store.dispatch(addUser(params));
   store.dispatch(addUser(params));

   // console.log(store.getState());

   // socket.on('signIn', params => {
   //    store.dispatch(addUser(params));
   //    console.log(store.getState());
   // });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
