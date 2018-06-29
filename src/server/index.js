import path from 'path';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import main from './get/main';
import socketConnection from './socket';

const PORT = 3000;
const app = express();
const server = http.Server(app);
const serverIo = new io(server, {
   serveClient: false,
   wsEngine: 'ws'
});

app.use(express.static(path.join('client')));
app.get('/', main);

serverIo.on('connection', socketConnection.bind(serverIo));

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
