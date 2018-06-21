import _ from 'lodash';

const NAMESPANCE_PLAYERS = '/players';

export default {
   NAMESPANCE_PLAYERS: NAMESPANCE_PLAYERS,

   /**
    * @param {String} room
    */
   PLAYER_ROOM: (room) => {
      return [NAMESPANCE_PLAYERS, _.camelCase(room)].join('-');
   }
}
