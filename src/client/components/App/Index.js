import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gamespace from '../Gamespace';
import Signin from '../Forms/SignIn';

export class App extends Component {
   componentDidMount() {
   };

   render() {
      const { userConfig } = this.props;
      let content;

      if (userConfig.login && userConfig.room) {
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
