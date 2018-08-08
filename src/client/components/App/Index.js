import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gamespace from '../Gamespace';
import Signin from '../Forms/SignIn';
import * as socket from 'client/common/Socket';
import * as socketActions from 'reducers/socket/actions';

export class App extends Component {
   componentDidMount() {
      const { dispatch } = this.props;
      const action = socketActions.add(socket.create());

      dispatch(action);
      dispatch(socketActions.on(
         'actions', (...actions) => {
            actions.forEach(action => {
               dispatch(action);
            });
         }
      ));
   };

   render() {
      const { userConfig } = this.props;
      let content;

      if (userConfig.login && userConfig.nameRoom) {
         content = <Gamespace />;
      } else {
         content = <Signin />;
      }

      return (
         <div className="app">
            <div className="content">{content}</div>
         </div>
      );
   };
};

export default connect(store => store)(App);
