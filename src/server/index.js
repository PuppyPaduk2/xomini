import path from 'path';
import express from 'express';
import http from 'http';
import main from './get/main';
import socket from './socket';

const PORT = 3000;
const app = express();
const httpServer = http.Server(app);

app.use(express.static(path.join('client')));
app.get('/', main);

socket(httpServer);

httpServer.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
