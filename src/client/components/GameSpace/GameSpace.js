import React, { Component } from 'react';
import GridColor from '../GridColors/GridColors';

export default class GameSpace extends Component {
   render() {
      const props = this.props;

      return <div className="game-space">
         <GridColor
            colors={props.stateGame}
            columns={props.columns} />

         <GridColor
            colors={props.palette}
            columns={3}
            colorClick={props.onColorPaletteClick} />
      </div>;
   }
}
