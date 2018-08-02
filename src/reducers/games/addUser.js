import defaultStore from './defaultStore';
import userConfigDefaultStore from '../userConfig/defaultStore';
import userConfig from '../userConfig';
import { setConfig } from '../userConfig/actions';
import gameDefaultStore from '../game/defaultStore';
import game from '../game';
import { addUser } from '../game/actions';

export default function(store = defaultStore, action) {
   const { room, login } = action;
   const { rooms, users } = store;
   let user = users[login];
   let storeRoom = rooms[room];

   if (!user) {
      user = userConfigDefaultStore;

      users[login] = userConfig(user, setConfig({ login, room }));

      if (!storeRoom) {
         storeRoom = gameDefaultStore();
      }

      rooms[room] = game(storeRoom, addUser(login));

      return { ...store };
   }

   return store;
};
