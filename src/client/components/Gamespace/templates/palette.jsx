import React from 'react';
import Button from '@material-ui/core/Button';
/**
 * @param {Object[]} palette
 */
export default function(palette = []) {
   palette = palette.map((color, index) => {
      const style = { backgroundColor: color };

      return (
         <Button
            key={index}
            size="small"
            variant="contained"
            style={style}
            className="color"
         >
            &nbsp;
         </Button>
      );
   });

   return <div className="palette">{palette}</div>;
};
