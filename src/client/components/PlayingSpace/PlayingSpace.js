import React, { Component } from 'react';
import template from './PlayingSpace.template';

export default class PlayingSpace extends Component {
   constructor(props) {
      super(props);

      this.state = {
         stateGame: props.stateGame instanceof Array
            ? props.stateGame
            : [],
         players: typeof props.players === 'number'
            ? props.players
            : 1
      };

      // if (props.setPlayers instanceof Function) {
      //    props.setPlayers = props.setPlayers.bind(this);
      // }
   }

   render() {
      return template.call(this, this.state);
   }
}
