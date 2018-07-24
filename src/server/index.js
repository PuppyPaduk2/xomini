import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import reducers from './reducers';
import { createStore } from 'redux';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

const store = createStore(reducers(serverIo));

serverIo.on('connection', socket => {
   store.dispatch({ type: 'SET_NAME', value: '@userName' });
   store.dispatch({ type: 'SET_LASTNAME', value: '@userLastName' });

   socket.on('signIn', params => {
      store.dispatch({ type: 'ADD_ROOM', value: params.room });

      console.log(store.getState());
   });

   console.log(store.getState());
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
