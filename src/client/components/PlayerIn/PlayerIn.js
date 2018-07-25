import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class PlayerIn extends Component {
   static defaultProps = {
      errorMessage: 'Insert name room!'
   };

   state = {
      room: '',
      login: '',
      openMessageError: false
   };

   changeText = name => ev => {
      const state = {};
      state[name] = ev.target.value;
      this.setState(state);
   };

   send = () => {
      const props = this.props;

      if (this.isValid()) {
         if (props.onSend instanceof Function) {
            props.onSend(this.state);
         }
      } else {
         this.toggleMessageError(true);
      }
   };

   toggleMessageError = (value) => {
      this.setState({
         openMessageError: !!value
      });
   };

   isValid = () => {
      const room = this.state.room;
      return typeof room === 'string' && room !== '';
   };

   render() {
      const props = this.props;
      const state = this.state;

      return (
         <div className="player-name">
            <TextField
               label="Room"
               value={state.room}
               onChange={this.changeText('room')}
               margin="normal"
            />

            <TextField
               label="Name"
               value={state.login}
               onChange={this.changeText('login')}
               margin="normal"
            />

            <Button
               className="button-send"
               size="small"
               color="primary"
               onClick={this.send}
            >
               Send
            </Button>

            <Snackbar
               className="message-error"
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
               }}
               open={state.openMessageError}
               autoHideDuration={6000}
               onClose={this.toggleMessageError.bind(this, false)}
               ContentProps={{
                  'aria-describedby': 'message-id',
               }}
               message={<span id="message-id">{props.errorMessage}</span>}
               action={[
                  <IconButton
                     key="close"
                     aria-label="Close"
                     color="inherit"
                     onClick={this.toggleMessageError.bind(this, false)}
                  >
                     <CloseIcon />
                  </IconButton>,
               ]}
            />

         </div>
      );
   };

}
