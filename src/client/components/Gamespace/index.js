import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   AppBar,
   Typography,
   Toolbar,
   Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BottomNav from './BottomNav';

export class Gamespace extends Component {

   closePlayersList = () => {
      this.setState({ openPlayersList: false });
   };

   render() {
      const { userConfig } = this.props;

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

            <div className="content"></div>

            <BottomNav />
         </div>
      );
   };
};

export default connect(store => store)(Gamespace);
