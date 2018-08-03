import React from 'react';
import ComponentSocket from '../ComponentSocket';
import { connect } from 'react-redux';
import colors from './colors';
import templates from './templates';
import gameAction from '../../../reducers/game/actions';

import Button from '@material-ui/core/Button';

export class Gamespace extends ComponentSocket {
   state = {
      ping: 0
   };

   componentDidMount(...args) {
      if (this.props.socket) {
         this.socket = this.props.socket;
      }

      this.socketOn({
         'userReady:fromClient': this._userReadyResult.bind(this)
      });
   };

   onStart = () => {
      const userConfig = this.props.userConfig;

      this.socketEmit(
         'userReady:toClient',
         gameAction.userReady(userConfig.login),
         userConfig.room
      );
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

export default connect(store => store)(Gamespace);
