import defaultStore from './defaultStore';
import game from '../game';
import gameActions from '../game/actions';

/**
 * @param {String} nameAction
 * @param {Object} store
 * @param {Object} action
 */
export default function(nameAction, store = defaultStore, action) {
   const { login } = action;
   const { rooms, users } = store;
   const user = users[login];

   if (user) {
      const room = user.room;
      let storeRoom = rooms[room];
      const gameAction = gameActions[nameAction];

      if (storeRoom) {
         rooms[room] = game(storeRoom, gameAction(login, action.value));

         return { ...store };
      }
   }

   return store;
};