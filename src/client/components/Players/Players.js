import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Players extends Component {
   static defaultProp = {
      players: []
   };

   render() {
      const players = this.props.players.map((player, index) => {
         return (
            <ListItem key={index}>
               <ListItemText
                  primary={player.name}
               />
            </ListItem>
         );
      });

      return (
         <div className="players">
            <List dense={true}>{players}</List>
         </div>
      );
   }
}
