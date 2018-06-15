import React, { Component } from 'react';
import GridColor from '../GridColors/GridColors';
import Players from '../Players/Players';
import createSocket from '../../common/createSocket';
import colors from './colors';

export default class App extends Component {
   static defaultProps = {
      stateGame: [
         { lock: true },
         { lock: true },
         { lock: true },
         { lock: true }
      ],
      players: [],
      palette: colors,
      playerName: ''
   };

   constructor(props) {
      super(props);
      this.state = props;
   }

   componentDidMount() {
      const players = createSocket('/players');

      this.sockets = { players: players };

      players.on('initConnection', this._changePlayers);
      players.on('update', this._changePlayers);
      players.on('initDisconnect', this._changePlayers);
   }

   colorClick() {
      console.log(this)
   }

   /**
    * @param {Object[]} players
    */
   _changePlayers = (players) => {
      this.setState({
         players: players
      });
   }

   _changeText(ev) {
      this.setState({
         playerName: ev.target.value
      });
   }

   _sendName = () => {
      console.log('_sendName:', this.state.playerName);

      this.sockets.players.emit('insertedName', this.state.playerName);
   }

   render() {
      const state = this.state;

      return <div className="app">
         <input type="text" value={this.state.playerName} onChange={this._changeText.bind(this)} />
         <button onClick={this._sendName}>Send name</button>

         <Players players={state.players} />

         <GridColor
            colors={state.stateGame}
            columns={state.players.length} />

         <GridColor
            colors={state.palette}
            columns={3}
            colorClick={this.colorClick.bind(this)} />
      </div>;
   }
}
