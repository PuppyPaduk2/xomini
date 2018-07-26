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

   const params1 = { room: 'MyRoom', login: '@myLogin' };
   const params2 = { room: 'MyRoom2', login: '@myLogin2' };
   const params3 = { room: 'MyRoom3', login: '@myLogin3' };

   changer.unsubscribe('users', handlers);

   store.dispatch(addUser(params1));
   store.dispatch(addUser(params1));

   let handler = () => {
      console.log('@handler');
   };

   changer.subscribe('users', handler);

   store.dispatch(addUser(params2));
   store.dispatch(addUser(params2));

   changer.unsubscribe('users', handler);

   store.dispatch(addUser(params3));

   console.log(store.getState());

   // socket.on('signIn', params => {
   //    store.dispatch(addUser(params));
   //    console.log(store.getState());
   // });
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
