import React from 'react';

/**
 * @param {Object} game
 */
export default function(game) {
   const { users } = game;
   const usersCount = Object.keys(users).length
   const contentStyle = {
      gridTemplateColumns: ['repeat(', ', 2rem)'].join(usersCount)
   };
   const content = game.state.map((step, stepIndex) => {
      return Object.keys(step).map((login, loginIndex) => {
         const style = { backgroundColor: step[login] };
         const key = [stepIndex, loginIndex].join('-');

         return (
            <div key={key} className="color" style={style}></div>
         );
      });
   });

   return (
      <div className="state">
         <div className="summPoints">
            {game.summPoints}
         </div>

         <div className="content" style={contentStyle}>
            {content}
         </div>
      </div>
   );
};
