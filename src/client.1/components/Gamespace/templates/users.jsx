import React from 'react';

export default function(users = {}) {
   users = Object.keys(users).map((login, index) => {
      const user = users[login];
      const className = ['user'];

      if (user.ready) {
         className.push('ready');
      }

      return (
         <div className={className.join(' ')} key={index}>
            {login}
         </div>
      );
   });

   return <div className="users">{users}</div>;
};
