import React from 'react';
import {
   AppBar,
   Typography,
   Toolbar,
   Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function(userConfig = {}) {
   return (
      <AppBar position="static" color="default">
         <Toolbar>
            <Typography variant="title" color="inherit">
               {userConfig.room}
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
   );
};
