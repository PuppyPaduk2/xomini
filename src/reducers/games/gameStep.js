export default function(store = {}, action) {
   const { login, room, value } = action;
   const game = store[room];

   if (game && login && value !== undefined) {
      let { step, state, users } = game;

      if (!step) {
         step = {};
         game.step = step;
      }

      if (!step[login]) {
         step[login] = value;

         const keysStep = Object.keys(step);

         if (keysStep.length === users.length) {
            game.point = isUnic(keysStep.map(key => step[key])) ? 1 : -1;
            game.summPoints += game.point;

            state.push(step);
            game.step = null;
         }
      }
   }

   return store;
};

function isUnic(values) {
   let _value = null;
   let result = true;

   values.forEach(value => {
      if (_value === null) {
         _value = value;
      } else if (_value !== value) {
         result = false;
      }
   });

   return result;
};
