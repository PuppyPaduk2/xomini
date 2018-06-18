import path from 'path';
import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import setupHttp from './setupHttp';

import Html from '../client/components/Html/Html';
import App from '../client/components/App/App';

const PORT = 3000;

const app = express();
const { server } = setupHttp(app);

app.use(express.static(path.join('client')));

app.get('/', function(req, res) {
   const initialData = {
      players: []
   };
   const htmlParams = {
      content: <App {...initialData} />,
      initialData: initialData
   };

   const result = ReactDom.renderToString(<Html {...htmlParams} />);

   return res.send(result);
});

server.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});
