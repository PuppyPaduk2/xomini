import React, { Component } from 'react';
import _ from 'lodash';

export default class Html extends Component {
   constructor(props) {
      props = _.pick(props, [
         'tilte',
         'content',
         'initialData'
      ]);

      super(props);

      if (props.initialData instanceof Object) {
         props.initialData = JSON.stringify(props.initialData);
      }

      this.state = props;
   }

   render() {
      const state = this.state;

      return <html>
         <head>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{state.title}</title>
            {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" /> */}
         </head>

         <body>
            <div id="root">
               {state.content}
            </div>
            <script id="initial-data" type="text/plain" data-json={state.initialData}></script>
            <script src="index.js"></script>
         </body>
      </html>;
   }
}