import Notify from '../../static/Notify';
import State from '../../static/State';

export default class Namespace extends Notify {
   /**
    * @param {Namespace} namespace
    * @param {Object} [handlers]
    * @param {Object} [options]
    * @param {Object|State} [options.state]
    */
   constructor(namespace, handlers = {}, options = {}) {
      super(options);

      /**
       * @param {String} nameRoom
       * @param {State} state
       * @param {Socket} socket
       */
      this.join = (nameRoom, state, socket) => {
         const result = Namespace.join(namespace, nameRoom, state, socket);

         this.emit('join', result, nameRoom, state, socket);

         return result;
      };

      /**
       * @param {String} nameRoom
       * @param {State|Object} state
       * @param {Socket} socket
       */
      this.joinOnce = (nameRoom, state, socket) => {
         let room = this.has(nameRoom);

         if (!room) {
            state = state instanceof State ? state : new State(state);
            room = this.join(nameRoom, state, socket);
         }

         Namespace.socketInRoom(room, socket);

         this.emit('joinOnce', room, nameRoom, state, socket);

         return room;
      };

      /**
       * @param {String} nameRoom
       * @param {Socket} socket
       */
      this.leave = (...args) => {
         Namespace.leave(namespace, ...args);
         this.emit('leave', ...args);
      };

      /**
       * @param {String} nameRoom
       */
      this.has = (...args) => {
         return Namespace.has(namespace, ...args);
      };

      namespace.on('connection', socket => {
         Object.keys(handlers).forEach(nameEvent => {
            const handlersEvent = handlers[nameEvent] instanceof Array
               ? handlers[nameEvent]
               : [handlers[nameEvent]];

            handlersEvent.forEach(handler => {
               socket.on(nameEvent, handler.bind(this, socket));
            });
         });

         socket.on('disconnecting', () => {
            if (socket.roomsState) {
               Object.keys(socket.roomsState).forEach(nameRoom => {
                  this.leave(nameRoom, socket);
               });
            }
         });

         this.emit('connection', socket);
      });
   };

   /**
    * @param {Namespace} namespace
    * @param {String} nameRoom
    * @param {State} state
    * @param {Socket} socket
    */
   static join(namespace, nameRoom, state, socket) {
      if (!namespace.rooms) {
         namespace.rooms = {};
      }

      if (!namespace.rooms[nameRoom]) {
         namespace.rooms[nameRoom] = {
            name: nameRoom,
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
            namespace.to(nameRoom).emit('state:change', state.collectValues(), nameRoom);
         };

         state.on({ change: room.change });

         Namespace.socketInRoom(room, socket);

         namespace.to(nameRoom).emit('state:join', state.collectValues(), nameRoom);
      }

      return room;
   };

   /**
    * @param {Namespace} namespace
    * @param {String} nameRoom
    * @param {Socket} socket
    */
   static leave(namespace, nameRoom, socket) {
      const room = Namespace.has(namespace, nameRoom);

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
   static has(namespace, nameRoom) {
      const room = !!namespace && !!namespace.rooms && namespace.rooms[nameRoom];
      return room ? room : false;
   };

   /**
    * @param {Object} room
    * @param {Socket} socket
    */
   static socketInRoom(room, socket) {
      if (room && socket && socket.join && room.sockets.indexOf(socket) === -1) {
         socket.join(room.name);

         room.sockets.push(socket);

         if (!socket.roomsState) {
            socket.roomsState = {};
         }

         socket.roomsState[room.name] = room;
      }
   };
};
