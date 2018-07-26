import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import { createStore } from 'redux';
import reducers from '../reducers';
import { add as addUser } from '../reducers/users';

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

store.dispatch(addUser('@user', '@room'));
store.dispatch(addUser('@user', '@room'));
store.dispatch(addUser('@user', '@room'));

console.log(store.getState());

// serverIo.on('connection', socket => {
//    console.log('@connection');

//    socket.on('inRoom', params => {
//       store.dispatch(addUser(params.login, params.room));
//    });
// });

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
