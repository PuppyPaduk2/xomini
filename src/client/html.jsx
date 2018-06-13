import React from 'react';
export default function(props) {
   return <html>
      <head>
         <title>Asset Management</title>
      </head>

      <body>
         <div id="root">
            {props.content}
         </div>
         <script src="bundle.js"></script>
      </body>
   </html>;
}
