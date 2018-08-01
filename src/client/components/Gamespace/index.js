import React, { Component } from 'react';
import { connect } from 'react-redux';
import palette from './palette';

import Button from '@material-ui/core/Button';

export class Gamespace extends Component {
   state = {
      disabledButtonStart: true
   };

   componentDidMount() {
      this._disabledButtonStartFalse(this.props, this.state);
   };

   componentDidUpdate(...args) {
      this._disabledButtonStartFalse(...args);
   };

   onStart = () => {
      this.setState({
         disabledButtonStart: true
      });
   };

   _disabledButtonStartFalse(props, state) {
      const { users } = props.game;

      if (Object.keys(users).length > 1 && state.disabledButtonStart === true) {
         this.setState({
            disabledButtonStart: false
         });
      }
   };

   render() {
      const { users } = this.props.game;
      const { disabledButtonStart } = this.state;
      let usersContent;
      const paletteColors = palette.map((color, index) => {
         const style = {
            backgroundColor: color,
            width: '2rem',
            maxWidth: '2rem',
            minWidth: '2rem',
         };

         return (
            <Button key={index} size="small" variant="contained" style={style}>&nbsp;</Button>
         );
      });

      if (users) {
         usersContent = Object.keys(users).map((login, index) => {
            return (
               <div className="user" key={index}>{login}</div>
            );
         });
      }

      return (
         <div className="gamespace">
            <div className="users">{usersContent}</div>

            <div className="state"></div>

            <div className="buttons">
               <div className="palette">{paletteColors}</div>

               <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  ref={el => this.button = el}
                  onClick={this.onStart}
                  disabled={disabledButtonStart}
               >
                  Start
               </Button>
            </div>
         </div>
      );
   };
};

export default connect(store => {
   return { game: store.game };
})(Gamespace);
