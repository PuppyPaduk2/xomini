import React, { Component } from 'react';

export default class Players extends Component {
   static defaultProp = {
      players: []
   };

   render() {
      const players = this.props.players.map((player, index) => {
         return <div className="player" key={index}>{player.name}</div>;
      });

      return <div className="players">{players}</div>;
   }
}
