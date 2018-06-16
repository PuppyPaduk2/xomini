import React, { Component } from 'react';
import Players from '../Players/Players';
import createSocket from '../../common/createSocket';
import colors from './colors';
import _ from 'lodash';

import PlayerIn from '../PlayerIn/PlayerIn';
import GameSpace from '../GameSpace/GameSpace';

const path = '/players';

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
      this.sockets = { players: createSocket(path) };
   };

   /**
    * @param {Object[]} players
    */
   changePlayers = (players) => {
      this.setState({ players: players });
   };

   signIn = (params) => {
      const sockets = this.sockets;
      let room;

      params.room = [path, _.camelCase(params.room)].join('-');

      sockets.players.emit('signIn', params);

      if (!sockets.room) {
         room = createSocket(params.room);
         room.on('initConnection', this.changePlayers);
         room.on('update', this.changePlayers);
         room.on('initDisconnect', this.changePlayers);
         sockets.room = room;
      }

      this.setState({ isSignIn: true });
   };

   render() {
      const state = this.state;
      let top;
      let center = <PlayerIn
         name={state.playerName}
         onChangeName={this._changeText}
         onSend={this.signIn}
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
