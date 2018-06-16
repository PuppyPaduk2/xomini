import React, { Component } from 'react';
import Players from '../Players/Players';
import createSocket from '../../common/createSocket';
import colors from './colors';

import PlayerIn from '../PlayerIn/PlayerIn';
import GameSpace from '../GameSpace/GameSpace';

export default class App extends Component {
   state = {
      stateGame: [
         { lock: true },
         { lock: true },
         { lock: true },
         { lock: true }
      ],
      players: [],
      palette: colors,
      isSignIn: false
   };

   componentDidMount() {
      const players = createSocket('/players');

      this.sockets = { players: players };

      players.on('initConnection', this.changePlayers);
      players.on('update', this.changePlayers);
      players.on('initDisconnect', this.changePlayers);
   };

   /**
    * @param {Object[]} players
    */
   changePlayers = (players) => {
      this.setState({ players: players });
   };

   _sendName = (params) => {
      this.sockets.players.emit('signIn', params);
      this.setState({ isSignIn: true });
   };

   render() {
      const state = this.state;
      let top;
      let center = <PlayerIn
         name={state.playerName}
         onChangeName={this._changeText}
         onSend={this._sendName}
      />;
      let bottom;

      if (state.isSignIn) {
         top = <Players players={state.players} />;

         center = <GameSpace
            stateGame={state.stateGame}
            columns={state.players.length}
            palette={state.palette}
         />;
      }

      return <div className="app">
         <div className="top">{top}</div>
         <div className="center">{center}</div>
         {bottom}
      </div>;
   };

}
