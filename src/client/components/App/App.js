import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setConfig } from '../../../reducers/userConfig/actions';
import createSocket from '../../common/createSocket';

import PlayerIn from '../PlayerIn';
import Gamespace from '../Gamespace';

export class App extends Component {
   state = {};

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

   playerInOnSend = (params) => {
      const { login, room } = params;

      this.socket.emit('inRoom', login, room);
      this.props.dispatch(setConfig({
         login,
         signIn: true
      }));
   };

   render() {
      const { userConfig } = this.props;

      let top;
      let center
      let bottom;

      if (userConfig && userConfig.signIn) {
         center = <Gamespace />;
      } else {
         center = <PlayerIn onSend={this.playerInOnSend} />;
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
