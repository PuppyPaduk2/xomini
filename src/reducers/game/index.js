export const types = {
   create: 'GAME_CREATE'
};

export const actions = {
   create: (login) => {
      return {
         type: types.create,
         id: 'game@' + new Date().getTime(),
         creator: login,
         users: {
            [login]: {}
         }
      };
   }
};

export default function(store = null, action) {
   const { type } = action;

   if (type === types.create) {
      const { id } = action;

      return {
         id
      };
   }

   return store;
};
