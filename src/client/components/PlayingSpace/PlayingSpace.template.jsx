import React from 'react';
import GridColors from '../GridColors/GridColors';

export default function(props) {
   return <div className="playing-space">
      {props.players}

      <GridColors colors={props.stateGame} columns={props.players} />
   </div>;
}
