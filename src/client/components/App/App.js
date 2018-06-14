import React, { Component } from 'react';
import template from './App.template';

export default class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         palette: {
            colors: [
               { color: '#f44336' },
               { color: '#e91e63' },
               { color: '#ffeb3b' },
               { color: '#673ab7' },
               { color: '#2196f3' },
               { color: '#00bcd4' },
               { color: '#009688' },
               { color: '#ff5722' },
               { color: '#9e9e9e' }
            ]
         }
      };
   }

   // click = () => {
   //    console.log('chat message');
   //    socket.emit('chat message', 'new message');
   // }

   render() {
      return template.call(this, this.state);
   }
}