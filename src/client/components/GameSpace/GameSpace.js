import React, { Component } from 'react';
import GridColor from '../GridColors/GridColors';
import { game } from '../../game';

export default class GameSpace extends Component {

   static defaultProps = game.defaultState();

   render() {
      const props = this.props;

      return (
         <div className="game-space">
            <GridColor
               colors={props.map}
               columns={props.players.length} />

            <GridColor
               colors={props.palette}
               columns={3} />
         </div>
      );
   };

}
