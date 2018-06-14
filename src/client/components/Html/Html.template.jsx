import React from 'react';

export default function(props) {
   return <html>
      <head>
         <title>{props.title}</title>
         <script src="/socket.io/socket.io.js"></script>
         <script src="socket.js"></script>
      </head>

      <body>
         <div id="root">
            {props.content}
         </div>
         <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
         <script src="bundle.js"></script>
      </body>
   </html>;
}
