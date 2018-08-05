import React from 'react';
import ComponentSocket from '../ComponentSocket';
import { BottomNavigation, BottomNavigationAction, AppBar, Typography, Toolbar } from '@material-ui/core';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';

export class Gamespace extends ComponentSocket {
   handleChange = (event, value) => {
      const { onExit } = this.props;

      if (value === 'exit' && onExit instanceof Function) {
         onExit();
      } else if (value === 'players') {
         console.log('@players');
      }
   };

   render() {
      return (
         <div className="gamespace">
            <div className="top">
               <AppBar position="static" color="default">
                  <Toolbar>
                        Photos
                     <Typography variant="title" color="inherit">
                     </Typography>
                  </Toolbar>
               </AppBar>
            </div>

            <div className="content"></div>

            <div className="bottom">
               <BottomNavigation
                  onChange={this.handleChange}
                  showLabels
               >
                  <BottomNavigationAction label="Players" value="players" icon={<People />} />
                  <BottomNavigationAction label="ExitToApp" value="exit" icon={<ExitToApp />} />
               </BottomNavigation>
            </div>
         </div>
      );
   };
};
