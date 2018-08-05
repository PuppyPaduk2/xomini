import React from 'react';
import ComponentSocket from '../ComponentSocket';
import { connect } from 'react-redux';
import createSocket from '../../common/createSocket';
import userConfigActions from '../../../reducers/userConfig/actions';
import gameActions from '../../../reducers/game/actions';

import PlayerIn from '../PlayerIn';
import Gamespace from '../Gamespace';

export class App extends ComponentSocket {
   componentDidMount() {
      const socket = createSocket();
      const { dispatch, game, userConfig } = this.props;

      this.socket = socket;

      this.socketOn({
         'addUser:fromClient': (action, room) => {
            dispatch(action);

            socket.emit(
               'mergeUsers:toClient',
               gameActions.mergeUsers(game.users),
               room
            );
         },
         'mergeUsers:fromClient': action => dispatch(action),
         'removeUser:fromServer': action => dispatch(action)
      });
   };

   inRoom = (params) => {
      const { dispatch } = this.props;
      const setLoginAction = userConfigActions.setLogin(params.login);
      const setRoomAction = userConfigActions.setRoom(params.room);

      dispatch(setLoginAction);
      dispatch(setRoomAction);

      const addUserAction = gameActions.addUser(setLoginAction.login);

      dispatch(addUserAction);

      this.socketEmit(
         'addUser:toClient',
         addUserAction,
         setRoomAction.room
      );
   };

   render() {
      const { userConfig } = this.props;

      let top;
      let center
      let bottom;

      if (userConfig && userConfig.room) {
         center = <Gamespace socket={this.socket} />;
      } else {
         center = <PlayerIn onSend={this.inRoom} />;
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
