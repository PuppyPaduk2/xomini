export default function(store = {}, action) {
   const { room, login } = action;
   let game = store[room];

   if (!game) {
      return {
         ...store,
         [room]: {
            users: [login],
            usersOut: [],
            begin: false,
            state: [],
            step: null,
            point: 0,
            summPoints: 0
         }
      };
   } else if (game && !game.begin && game.users.indexOf(login) === -1) {
      game.users.push(login);
   }

   return store;
};
