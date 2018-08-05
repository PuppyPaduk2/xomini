import React from 'react';
import ComponentSocket from '../ComponentSocket';
import { connect } from 'react-redux';
import colors from './colors';
import templates from './templates';
import gameAction from '../../../reducers/game/actions';

import { BottomNavigation, BottomNavigationAction, Button } from '@material-ui/core';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';

export class Gamespace extends ComponentSocket {
   state = {
      ping: 0
   };

   componentDidMount(...args) {
      const { dispatch } = this.props;

      if (this.props.socket) {
         this.socket = this.props.socket;
      }

      this.socketOn({
         'userReady:fromClient': this._userReadyResult.bind(this),
         'addStep:fromClient': action => dispatch(action)
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

   _onClickColor = color => () => {
      const { dispatch, userConfig } = this.props;
      const addStepAction = gameAction.addStep(userConfig.login, color);

      dispatch(addStepAction);
      this.socketEmit('addStep:toClient', addStepAction, userConfig.room);
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
      const { game } = this.props;
      const { users, begin } = game;
      const usersCount = Object.keys(users).length;
      let disabledButtonStart = (!begin && usersCount > 1) ? false : true;
      let userReady = ping > 1
         ? (<div className="user-ready" key={ping}><div className="ping"></div></div>)
         : null;

      return (
         <div className="gamespace">
            {templates.state(game)}

            <div className="buttons">
               {templates.palette(colors, this._onClickColor, !begin)}

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

            <BottomNavigation
               showLabels
            >
               <BottomNavigationAction label="People" icon={<People />} />
               <BottomNavigationAction label="ExitToApp" icon={<ExitToApp />} />
            </BottomNavigation>
         </div>
      );
   };
};

export default connect(store => store)(Gamespace);
