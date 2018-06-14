import React, { Component } from 'react';
import GridColor from '../GridColors/GridColors';
import Players from '../Players/Players';

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
   static defaultProps = {
      stateGame: [
         { lock: true },
         { lock: true },
         { lock: true },
         { lock: true }
      ],
      players: [],
      palette: colors
   };

   constructor(props) {
      super(props);
      this.state = props;
   }

   componentDidMount() {
      socket.on('player:connection', this._playerConnection);
   }

   colorClick() {
      console.log(this)
      // this.setState({
      //    players: this.state.players + 1
      // });
   }

   /**
    * @param {Object[]} players
    */
   _playerConnection = (players) => {
      this.setState({
         players: players
      });
   }

   render() {
      const state = this.state;

      return <div className="app">
         <Players players={state.players}/>

         <GridColor
            colors={state.stateGame}
            columns={state.players.length}/>

         <GridColor
            colors={state.palette}
            columns={3}
            colorClick={this.colorClick.bind(this)} />
      </div>;
   }
}
