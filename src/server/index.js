import gameIo from '../game.io/server';

import { Router } from 'express';

import React from 'react';
import ReactDom from 'react-dom/server';

import Html from '../client/components/Html/Html';
import App from '../client/components/App/App';

const defRouter = new Router();

defRouter.get('/', function(req, res) {
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

const game = gameIo({
   static: ['client'],

   routers: [defRouter],

   events: {
      run: function() {
         console.log(`Example app listening on port ${this.port}!`);
      }
   }
});

game.run();