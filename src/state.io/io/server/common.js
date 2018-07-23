import State from '../../static/State';

/**
 * @param {Object} sockets
 */
export function socketsInRoom(sockets) {
   return Object.keys(sockets).reduce((result, id) => {
      const socket = sockets[id];

      Object.keys(socket.rooms).forEach(idRoom => {
         if (idRoom !== id) {
            if (!result[idRoom]) {
               result[idRoom] = 0;
            }

            result[idRoom]++;
         }
      });

      return result;
   }, {});
};

/**
 * @param {Namespace} namespace
 * @param {String} nameRoom
 * @param {State} state
 * @param {Socket} socket
 */
export function join(namespace, nameRoom, state, socket) {
   if (!namespace.rooms) {
      namespace.rooms = {};
   }

   if (!namespace.rooms[nameRoom]) {
      namespace.rooms[nameRoom] = {
         state: null,
         change: null,
         sockets: []
      };
   }

   let room = namespace.rooms[nameRoom];

   if (state instanceof State && room.state !== state) {
      if (room.state instanceof State) {
         room.state.off(room.change);
      }

      room.state = state;
      room.change = function() {
         console.log('@room.change', state.collectValues());
      };

      state.on({ change: room.change });

      if (socket && socket.join && room.sockets.indexOf(socket) === -1) {
         room.sockets.push(socket);

         if (!socket.roomsState) {
            socket.roomsState = {};
         }

         socket.roomsState[nameRoom] = room;
      }
   }

   return room;
};

/**
 * @param {Namespace} namespace
 * @param {String} nameRoom
 * @param {Socket} socket
 */
export function leave(namespace, nameRoom, socket) {
   const room = has(namespace, nameRoom);

   if (room) {
      const index = room.sockets.indexOf(socket);

      if (index !== -1) {
         room.sockets.splice(index, 1);
      }

      if (!room.sockets.length) {
         room.state.off(room.change);
         delete namespace.rooms[nameRoom];
      }
   }
};

/**
 * @param {Namepace} namespace
 * @param {String} nameRoom 
 */
export function has(namespace, nameRoom) {
   const room = !!namespace && !!namespace.rooms && namespace.rooms[nameRoom];
   return room ? room : false;
};
