import React, { Component } from 'react';
import { connect } from 'react-redux';

import createSocket from '../../common/createSocket';
import palette from './palette';

import PlayerIn from '../PlayerIn/PlayerIn';
import Players from '../Players/Players';
import GameSpace from '../GameSpace/GameSpace';
import Button from '@material-ui/core/Button';

export class App extends Component {
   state = {
      palette,
      isSignIn: false
   };

   componentDidMount() {
      const socket = createSocket();
      const dispatch = this.props.dispatch;

      this.socket = socket;

      socket.on('fetch:result', action => {
         dispatch(action);
      });

      socket.on('userJoinInRom', action => {
         dispatch(action);
      });

      socket.on('socket:disconnect', action => {
         dispatch(action);
      });

      setTimeout(() => {
         socket.emit('fetch');
      }, 0);
   };

   onClickBegin = () => {
      console.log('onClickBegin');
   };

   playerInOnSend = (params) => {
      const { login, room } = params;
      this.socket.emit('inRoom', {
         login,
         room
      });
   };

   render() {
      const state = this.state;
      let top;
      let center = <PlayerIn onSend={this.playerInOnSend} />;
      let bottom;
      const users = this.props.users;

      top = Object.keys(users).map((nameUser, index) => {
         return (
            <div key={index}>{nameUser}::{users[nameUser].room}</div>
         );
      });

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
};

function test(store) {
   return store;
};

export default connect(test)(App);
