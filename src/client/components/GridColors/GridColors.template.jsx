import React from 'react';
import _ from 'lodash';

export default function(props) {

   const rows = _.chunk(props.colors, props.columns).map((row, rowIndex) => {
      const colors = row.map((config, configIndex) => {
         const color = config.color;
         const style= {
            backgroundColor: color
         };
         const colorClick = props.colorClick instanceof Function
            ? props.colorClick.bind(this, config)
            : undefined;

         return <div className="color"
            key={[rowIndex, configIndex].join('/')}
            style={style}
            onClick={colorClick}></div>;
      });

      return <div className="row" key={rowIndex}>{colors}</div>
   });

   return <div className="grid-colors">{rows}</div>;
}
