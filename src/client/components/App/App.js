import React, { Component } from 'react';
import template from './App.template';

const colors = [
   { color: '#f44336' },
   { color: '#e91e63' },
   { color: '#ffeb3b' },
   { color: '#673ab7' },
   { color: '#2196f3' },
   { color: '#00bcd4' },
   { color: '#009688' },
   { color: '#ff5722' },
   { color: '#9e9e9e' }
];

export default class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         stateGame: colors.concat(colors).concat(colors),
         players: 5,
         palette: colors
      };
   }

   click = () => {
      // console.log('click', this.state);

      this.setState({
         stateGame: this.state.stateGame.concat(colors).concat(colors),
         players: this.state.players + 1
      });

   //    console.log('chat message');
   //    socket.emit('chat message', 'new message');
   }

   playingSpaceonRef = (ref) => {
      console.log(ref);
   }

   render() {
      return template.call(this, this.state);
   }
}