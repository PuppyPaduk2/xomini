import React from 'react';
import {
   BottomNavigation,
   BottomNavigationAction,
   Badge,
   Dialog,
   AppBar,
   Toolbar,
   IconButton,
   Typography
} from '@material-ui/core';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Close from '@material-ui/icons/Close';
import Chat from '@material-ui/icons/Chat';

export default function(state = {}, handlers = {}) {
   const people = <Badge badgeContent={0} color="primary">
      <People />
   </Badge>;

   return (
      <div>
         <BottomNavigation
            onChange={handlers.bottomNavigation}
            showLabels
         >
            <BottomNavigationAction label="Players" value="players" icon={people} />
            <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
            <BottomNavigationAction label="ExitToApp" value="exit" icon={<ExitToApp />} />
         </BottomNavigation>

         <Dialog
            fullScreen
            open={state.openPlayersList}
         >
            <AppBar color="default">
               <Toolbar>
                  <IconButton
                     color="inherit"
                     aria-label="Close"
                     onClick={handlers.closePlayersList}
                  >
                     <Close />
                  </IconButton>

                  <Typography variant="title" color="inherit">
                     Players list
                  </Typography>
               </Toolbar>
            </AppBar>
         </Dialog>
      </div>
   );
};
