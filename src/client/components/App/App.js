import React, { Component } from 'react';
import Players from '../Players/Players';
import createSocket from '../../common/createSocket';
import colors from './colors';
import { game } from '../../game';
import _ from 'lodash';

import PlayerIn from '../PlayerIn/PlayerIn';
import GameSpace from '../GameSpace/GameSpace';
import Button from '@material-ui/core/Button';

const path = '/players';

export default class App extends Component {
   state = _.merge({
      palette: colors,
      isSignIn: false,
      count: 0
   }, game.defaultState());

   componentDidMount() {
      const all = createSocket();

      this.sockets = { players: createSocket(path) };

      all.on('state:create', (values) => {
         this.setState(values);
         console.log('state:create', values);
      });

      all.on('state:change', (values) => {
         this.setState(values);
         console.log('state:change', values);
      });
   };

   initConnection = params => {
      params.isSignIn = true;
      this.setState(params);

      console.log(this.state);
   };

   initConnectionError = message => {
      if (!this.state.begin) {
         this.sockets.room.disconnect();
         delete this.sockets.room;
      }
   };

   signIn = (params) => {
      const sockets = this.sockets;
      let room;

      params.room = [path, _.camelCase(params.room)].join('-');

      sockets.players.emit('signIn', params);

      if (!sockets.room) {
         room = createSocket(params.room, {
            query: { name: params.name }
         });

         room.on('initConnection', this.initConnection);
         room.on('initConnectionError', this.initConnectionError);
         room.on('initDisconnect', this.setState.bind(this));
         room.on('begin', this.setState.bind(this));

         sockets.room = room;
      }
   };

   onClickBegin = () => {
      if (!this.state.begin) {
         this.sockets.room.emit('begin');
      }
   };

   render() {
      const state = this.state;
      let top;
      let center = <PlayerIn onSend={this.signIn} />;
      let bottom;

      if (state.isSignIn) {
         top = <Players players={state.players} />;

         center = (
            <GameSpace
               map={state.map}
               players={state.players}
               palette={state.palette}
            />
         );

         bottom = (
            <Button
               className="button-send"
               color="primary"
               onClick={this.onClickBegin}
            >
               Start
            </Button>
         );
      }

      return (
         <div className="app">
            <div className="top">{top}{state.count}</div>
            <div className="center">{center}</div>
            <div className="bottom">{bottom}</div>
         </div>
      );
   };

}
