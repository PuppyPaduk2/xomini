import React from 'react';
import ReactDom from 'react-dom/server';

import Html from '../../client/components/Html/Html';
import App from '../../client/components/App/App';

export default function(req, res) {
   const initialData = {
      players: []
   };
   const htmlParams = {
      content: <App {...initialData} />,
      initialData: initialData
   };

   const result = ReactDom.renderToString(<Html {...htmlParams} />);

   return res.send(result);
}
