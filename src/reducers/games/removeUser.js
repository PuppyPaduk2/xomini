export default function(store = {}, action) {
   const { room, login } = action;
   const game = store[room];

   if (game) {
      const { users, usersOut } = game;
      const index = users.indexOf(login);

      if (!game.begin) {
         users.splice(index, 1);

         if (!users.length) {
            delete store[room];
            return { ...store };
         }
      } else {
         if (index !== -1) {
            usersOut.push(login);
         }

         if (users.length === usersOut.length) {
            delete store[room];
            return { ...store };
         }
      }
   }

   return store;
};
