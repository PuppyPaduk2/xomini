import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from './colors';
import templates from './templates';

import Button from '@material-ui/core/Button';

export class Gamespace extends Component {
   state = {
      ping: 0
   };

   componentDidMount() {
      this.socketOn({
         'user:ready:result': this._userReadyResult.bind(this)
      });
   };

   onStart = () => {
      this.socketEmit('user:ready');
   };

   socketOn = (handlers = {}) => {
      const { socket } = this.props;

      if (socket && socket.emit) {
         Object.keys(handlers).forEach(nameEvent => {
            let eventHandlers = handlers[nameEvent];

            if (eventHandlers instanceof Function) {
               eventHandlers = [eventHandlers];
            }

            if (eventHandlers instanceof Array) {
               eventHandlers.forEach(handler => {
                  if (handler instanceof Function) {
                     socket.on(nameEvent, handler);
                  }
               });
            }
         });
      }
   };

   socketEmit = (nameEvent, ...args) => {
      const { socket } = this.props;

      if (socket && socket.emit) {
         socket.emit(nameEvent, ...args);
      }
   };

   _userReadyResult(action) {
      const { dispatch, userConfig } = this.props;

      dispatch(action);

      if (userConfig.login !== action.login) {
         this.setState({
            ping: this.state.ping + 1
         });
      }
   };

   render() {
      const { ping } = this.state;
      const { users, begin } = this.props.game;
      const usersCount = Object.keys(users).length;
      let disabledButtonStart = (!begin && usersCount > 1) ? false : true;
      let userReady = ping > 1
         ? (<div className="user-ready" key={ping}><div className="ping"></div></div>)
         : null;

      return (
         <div className="gamespace">
            {templates.users(users)}

            <div className="state"></div>

            <div className="buttons">
               {templates.palette(colors)}

               <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  ref={el => this.button = el}
                  onClick={this.onStart}
                  disabled={disabledButtonStart}
               >
                  Start
               </Button>

               {userReady}
            </div>
         </div>
      );
   };
};

export default connect(store => {
   return store;
})(Gamespace);
