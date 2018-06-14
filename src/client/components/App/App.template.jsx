import React from 'react';
import GridColor from '../GridColors/GridColors';
import Palette from '../Palette/Palette';

export default function(props) {
   return <div className="app" onClick={this.click}>
      <GridColor
         colors={props.stateGame}
         columns={props.players}
         colorClick={this.colorClick.bind(this)}/>

      <Palette colors={props.palette} />
   </div>;
}
