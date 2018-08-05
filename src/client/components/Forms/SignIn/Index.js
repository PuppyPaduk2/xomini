import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';

export class Signin extends Component {
   values = {
      nameRoom: '',
      login: '',
   };

   state = {
      errorNameRoom: false
   };

   changeText = name => ev => {
      this.values[name] = ev.target.value.trim();

      if (name === 'nameRoom' && this.state.errorNameRoom) {
         this.setState({ errorNameRoom: false });
      }
   };

   signin = () => {
      let { nameRoom, login } = this.values;
      const { onSignIn } = this.props;

      if (nameRoom !== '' && onSignIn instanceof Function) {
         onSignIn(nameRoom, login);
      } else {
         this.setState({ errorNameRoom: true });
      }
   };

   render() {
      const { errorNameRoom } = this.state;
      const { nameRoom, login } = this.values;

      return (
         <div className="form-signin">
            <Input
               placeholder="Name room"
               defaultValue={nameRoom}
               onChange={this.changeText('nameRoom')}
               error={errorNameRoom}
            />

            <Input
               placeholder="Login"
               defaultValue={login}
               onChange={this.changeText('login')}
            />

            <Button
               variant="contained"
               size="small"
               color="primary"
               onClick={this.signin}
            >
               Sign in
            </Button>
         </div>
      );
   };
};