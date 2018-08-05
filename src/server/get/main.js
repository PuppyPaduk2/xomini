import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { gameReducers } from '../../reducers';

import Html from '../../client/components/Html/Html';
import App from '../../client/components/App/App';

export default function(req, res) {
   const initialData = {};

   const htmlParams = {
      content: (
         <Provider store={createStore(gameReducers)}>
            <App />
         </Provider>
      ),
      initialData: initialData
   };

   const result = renderToString(<Html {...htmlParams} />);

   return res.send(result);
}
