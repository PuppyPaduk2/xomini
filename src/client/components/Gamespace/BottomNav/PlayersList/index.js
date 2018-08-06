import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   Dialog,
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   List,
   ListItem
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';

export class PlayersList extends Component {
   static defaultProps = {
      open: false,
      onClose: null
   };

   render() {
      let { open, onClose, users, userConfig } = this.props;

      const usersList = Object.keys(users).map((login, index) => {
         return <ListItem key={index} button>{login}</ListItem>;
      });

      return (
         <div className="players-list">
            <Dialog
               fullScreen
               open={open}
            >
               <div className="players-list-dialog">
                  <div>
                     <AppBar position="static" color="default">
                        <Toolbar>
                           <IconButton
                              color="inherit"
                              aria-label="Close"
                              onClick={onClose}
                           >
                              <Close />
                           </IconButton>

                           <Typography variant="title" color="inherit">
                              Players list
                           </Typography>
                        </Toolbar>
                     </AppBar>
                  </div>

                  <div>
                     <List>
                        {usersList}
                     </List>
                  </div>
               </div>
            </Dialog>
         </div>
      );
   };
};

export default connect(store => store)(PlayersList);
