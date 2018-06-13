import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import template from '../client/html';
import App from '../client/components/App/App';

const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/*', function(req, res) {
   const result = ReactDom.renderToString(template({
      content: <App name="123123"/>
   }));

   return res.send(result);
});

app.listen(PORT, function() {
   console.log(`Example app listening on port ${PORT}!`);
});