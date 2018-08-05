import React from 'react';
import ComponentSocket from '../ComponentSocket';
import { connect } from 'react-redux';
import { Gamespace } from '../Gamespace';
import { Signin } from '../Forms/SignIn';

import { actions as gameActions } from '../../../reducers/userConfig';

export class App extends ComponentSocket {
   state = {
      mode: 'signin' // 'game'
   };

   componentDidMount() {
   };

   onSignIn = (nameRoom, login) => {
      const { dispatch } = this.props;

      dispatch(gameActions.setRoom(nameRoom));
      dispatch(gameActions.setLogin(login));

      this.setState({ mode: 'game' });
   };

   onExit = () => {
      this.props.dispatch(gameActions.reset());

      this.setState({ mode: 'signin' });
   };

   render() {
      const { mode } = this.state;
      let content = <Signin onSignIn={this.onSignIn} />;

      console.log(this.props.userConfig);

      if (mode === 'game') {
         content = <Gamespace onExit={this.onExit} />;
      }

      return (
         <div className="app">
            <div className="content">{content}</div>
         </div>
      );
   };
};

export default connect(store => store)(App);
