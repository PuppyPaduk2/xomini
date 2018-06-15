import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class PlayerName extends Component {
   render() {
      return <div className="player-name">
         <TextField
            label="Name"
            value={this.props.text}
            onChange={this.props.onChange}
            margin="normal"
         />

         <Button
            variant="contained"
            color="primary"
            onClick={this.props.onSend}
         >
            Send name
         </Button>
      </div>;
   }
}
