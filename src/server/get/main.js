import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Html from '../../client/components/Html/Html';
import App from '../../client/components/App/App';

export default function(req, res) {
   const initialData = {
      store: req.store.getState()
   };
   const htmlParams = {
      content: (
         <Provider store={req.store}>
            <App />
         </Provider>
      ),
      initialData: initialData
   };

   const result = renderToString(<Html {...htmlParams} />);

   return res.send(result);
}
