import React, { Component } from 'react';
import Players from '../Players/Players';
import createSocket from '../../common/createSocket';
import colors from './colors';

import PlayerName from '../PlayerName/PlayerName';
import GameSpace from '../GameSpace/GameSpace';

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
      playerName: '',
      isSendName: false
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

   colorClick = () => {
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

   _changeText = ev => {
      this.setState({
         playerName: ev.target.value
      });
   }

   _sendName = () => {
      console.log('_sendName:', this.state.playerName);

      this.sockets.players.emit('insertedName', this.state.playerName);
      this.setState({ isSendName: true });
   }

   render() {
      const state = this.state;
      let top;
      let center = <PlayerName
         text={state.playerName}
         onChange={this._changeText}
         onSend={this._sendName}
      />;
      let bottom;

      if (state.isSendName) {
         top = <Players players={state.players} />;

         center = <GameSpace
            stateGame={state.stateGame}
            columns={state.players.length}
            palette={state.palette}
            onColorPaletteClick={state.colorClick}
         />;
      }

      return <div className="app">
         <div className="top">{top}</div>
         <div className="center">{center}</div>
         {bottom}
      </div>;
   }
}
