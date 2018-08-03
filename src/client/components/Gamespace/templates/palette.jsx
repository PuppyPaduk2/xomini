import React from 'react';
import Button from '@material-ui/core/Button';

/**
 * @param {Object[]} palette
 * @param {Function} onClick
 * @param {Boolean} [disabled]
 */
export default function(palette = [], onClick, disabled = true) {
   palette = palette.map((color, index) => {
      const style = disabled ? {} : { backgroundColor: color };

      return (
         <Button
            key={index}
            size="small"
            variant="contained"
            style={style}
            className="color"
            onClick={onClick(color)}
            disabled={disabled}
         >
            &nbsp;
         </Button>
      );
   });

   return <div className="palette">{palette}</div>;
};
