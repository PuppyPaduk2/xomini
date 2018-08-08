import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { client } from 'reducers';

import Html from '../../client/components/Html';
import App from '../../client/components/App';

export default function(req, res) {
   const initialData = {};

   const htmlParams = {
      content: (
         <Provider store={createStore(client)}>
            <App />
         </Provider>
      ),
      initialData: initialData
   };

   const result = renderToString(<Html {...htmlParams} />);

   return res.send(result);
}
