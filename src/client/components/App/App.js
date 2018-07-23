import React, { Component } from 'react';
import createSocket from '../../common/createSocket';
import colors from './colors';
import _ from 'lodash';

import PlayerIn from '../PlayerIn/PlayerIn';
import Players from '../Players/Players';
import GameSpace from '../GameSpace/GameSpace';
import Button from '@material-ui/core/Button';

export default class App extends Component {
   state = _.merge({
      palette: colors,
      isSignIn: false
   });

   componentDidMount() {
      const socket = createSocket();

      this.socket = socket;

      socket.on('state:join', (...args) => {
         console.log('@state:join', ...args);
      });

      socket.on('state:change', (...args) => {
         console.log('@state:change', ...args);
      });
   };

   onClickBegin = () => {
      console.log('onClickBegin');
   };

   playerInOnSend = (params) => {
      this.socket.emit('signIn', params);
   };

   render() {
      const state = this.state;
      let top;
      let center = <PlayerIn onSend={this.playerInOnSend} />;
      let bottom;

      if (state.isSignIn) {
         // top = <Players players={state.players} />;

         // center = (
         //    <GameSpace
         //       map={state.map}
         //       players={state.players}
         //       palette={state.palette}
         //    />
         // );

         // bottom = (
         //    <Button
         //       className="button-send"
         //       color="primary"
         //       onClick={this.onClickBegin}
         //    >
         //       Start
         //    </Button>
         // );
      }

      return (
         <div className="app">
            <div className="top">{top}</div>
            <div className="center">{center}</div>
            <div className="bottom">{bottom}</div>
         </div>
      );
   };

}
