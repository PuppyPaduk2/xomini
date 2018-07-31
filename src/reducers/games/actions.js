export const gameTypes = {
   begin: 'GAME_BEGIN',
   step: 'GAME_STEP'
};

/**
 * @param {String} room
 */
export function gameBegin(room) {
   return {
      type: gameTypes.begin,
      room
   };
};

/**
 * @param {String} login
 * @param {*} value
 */
export function gameStep(login, value) {
   return {
      type: gameTypes.step,
      login,
      value
   };
};
