import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   List,
   ListItem
} from '@material-ui/core';

export class PlayersList extends Component {
   render() {
      const { users } = this.props;
      const usersList = Object.keys(users).map((login, index) => {
         return <ListItem key={index} button>{login}</ListItem>;
      });

      return (
         <div className="players-list">
            <List>
               {usersList}
            </List>
         </div>
      );
   };
};

export default connect(store => store)(PlayersList);
