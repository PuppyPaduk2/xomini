import React from 'react';
import GridColors from '../GridColors/GridColors';

export default function(props) {
   return <div className="palette">
      <GridColors colors={props.colors} columns={props.columns} />
   </div>;
}
