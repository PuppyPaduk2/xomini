import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import Http from 'http';
import Io from 'socket.io';

import Html from '../client/components/Html/Html';
import App from '../client/components/App/App';

const PORT = 3000;

const app = express();
const http = Http.Server(app);
const io = Io(http);

app.use(express.static(__dirname + '/../client'));

app.get('/*', function(req, res) {
   const initialData = {
      name: '123123'
   };
   const htmlParams = {
      content: <App {...initialData} />,
      initialData: initialData
   };

   const result = ReactDom.renderToString(<Html {...htmlParams} />);

   return res.send(result);
});

io.on('connection', function(socket) {
   console.log('a user connected', socket.rooms);

   socket.on('disconnect', function() {
      console.log('user disconnected');
   });

   socket.on('chat message', function(msg) {
      console.log('message: ' + msg + socket.id);
   });
});

http.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
