import React from 'react';
import PlayingSpace from '../PlayingSpace/PlayingSpace';
import Palette from '../Palette/Palette';

export default function(props) {
   return <div className="app" onClick={this.click}>
      <PlayingSpace
         onRef={this.playingSpaceonRef}
         stateGame={props.stateGame}
         players={props.players}/>

      <Palette colors={props.palette} />
   </div>;
}
