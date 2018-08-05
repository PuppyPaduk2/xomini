import React from 'react';

/**
 * @param {Object} game
 */
export default function(game) {
   let { users, state, step } = game;
   const usersKeys = Object.keys(users);
   const usersCount = usersKeys.length;
   const contentStyle = {
      gridTemplateColumns: ['repeat(', ', 2rem)'].join(usersCount)
   };

   let content = [];

   state = [...state].reverse();

   for (var indexRow = 0; indexRow < 3; indexRow++) {
      for (var indexUser = 0; indexUser < usersCount; indexUser++) {
         const key = [indexRow, indexUser].join('-');
         let style = {};

         if (indexRow === 2 && step) {
            style = {
               backgroundColor: 'dimgray'
            };
         } else if (state[1 - indexRow]) {
            style = {
               backgroundColor: state[1 - indexRow][usersKeys[indexUser]]
            };
         }

         content.push(
            <div key={key} className="color" style={style}></div>
         );
      }
   }

   return (
      <div className="state">
         <div className="content" style={contentStyle}>
            {content}
         </div>
      </div>
   );
};
