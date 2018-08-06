import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';

import { actions as userConfigActions } from 'reducers/userConfig';
import { actions as usersActions } from 'reducers/users';

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
      const { dispatch } = this.props;
      let { nameRoom, login } = this.values;

      if (nameRoom !== '') {
         const setLoginAction = userConfigActions.setLogin(login);

         dispatch(userConfigActions.setNameRoom(nameRoom));
         dispatch(setLoginAction);

         console.log(setLoginAction)

         dispatch(usersActions.add(setLoginAction.login));
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

export default connect()(Signin);
