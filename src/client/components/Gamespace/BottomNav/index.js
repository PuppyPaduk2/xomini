import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   BottomNavigation,
   BottomNavigationAction,
   Badge
} from '@material-ui/core';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Chat from '@material-ui/icons/Chat';

import { actions as gameActions } from 'reducers/userConfig';
import PlayersList from './PlayersList';

export class BottomNav extends Component {
   state = {
      openPlayersList: false
   };

   changeValue = (event, value) => {
      if (value === 'exit') {
         this.props.dispatch(gameActions.reset());
      } else if (value === 'players') {
         this.setState({ openPlayersList: true });
      }
   };

   playersListOnClose = () => {
      this.setState({ openPlayersList: false });
   };

   render() {
      const usersCount = Object.keys(this.props.users).length;
      const people = <Badge badgeContent={usersCount} color="primary">
         <People />
      </Badge>;

      return (
         <div className="bottom-nav">
            <BottomNavigation
               onChange={this.changeValue}
               showLabels
            >
               <BottomNavigationAction label="Players" value="players" icon={people} />
               <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
               <BottomNavigationAction label="ExitToApp" value="exit" icon={<ExitToApp />} />
            </BottomNavigation>

            <PlayersList
               open={this.state.openPlayersList}
               onClose={this.playersListOnClose}
            />
         </div>
      );
   };
};

export default connect(store => store)(BottomNav);
