import React from 'react';
import Palette from '../Palette/Palette';

export default function(props) {
   return <div className="app" onClick={this.click}>
      <Palette {...props.palette}/>
   </div>;
}
