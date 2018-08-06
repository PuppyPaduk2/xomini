import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   AppBar,
   Typography,
   Toolbar,
   Button,
   BottomNavigation,
   BottomNavigationAction,
   Badge
} from '@material-ui/core';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Chat from '@material-ui/icons/Chat';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Game from './Content/Game';
import PlayersList from './Content/PlayersList';
import { actions as userConfigActions } from 'reducers/userConfig';
import { actions as usersActions } from 'reducers/users';

export class Gamespace extends Component {
   state = {
      mode: 'game'
   };

   changeValueNav = (event, value) => {
      const { dispatch, userConfig } = this.props;

      if (value === 'exit') {
         dispatch(usersActions.remove(userConfig.login));
         dispatch(userConfigActions.reset());
      } else {
         this.setState({ mode: value });
      }
   };

   render() {
      const { mode } = this.state;
      const { userConfig } = this.props;
      const usersCount = Object.keys(this.props.users).length;
      const people = <Badge badgeContent={usersCount} color="primary">
         <People />
      </Badge>;
      let content;

      if (mode === 'game') {
         content = <Game />;
      } else if (mode === 'players') {
         content = <PlayersList />;
      }

      return (
         <div className="gamespace">
            <div className="top">
               <AppBar position="static" color="default">
                  <Toolbar>
                     <Typography variant="title" color="inherit">
                        {userConfig.nameRoom}
                     </Typography>

                     <div className="login">
                        <Button size="small">
                           <AccountCircle
                              style={({ marginRight: '.5rem' })}
                              color="primary"
                           />

                           {userConfig.login}
                        </Button>
                     </div>
                  </Toolbar>
               </AppBar>
            </div>

            <div className="content">
               {content}
            </div>

            <div className="bottom-nav">
               <BottomNavigation
                  value={mode}
                  onChange={this.changeValueNav}
                  showLabels
               >
                  <BottomNavigationAction label="Game" value="game" icon={<VideogameAsset />} />
                  <BottomNavigationAction label="Players" value="players" icon={people} />
                  <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
                  <BottomNavigationAction label="ExitToApp" value="exit" icon={<ExitToApp />} />
               </BottomNavigation>
            </div>
         </div>
      );
   };
};

export default connect(store => store)(Gamespace);
