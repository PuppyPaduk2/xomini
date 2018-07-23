import Notify from '../../static/Notify';
import State from '../../static/State';

export default class Namespace extends Notify {
   /**
    * @param {Namespace} namespace
    * @param {Object} [handlers]
    * @param {Object} [options]
    */
   constructor(namespace, handlers = {}, options = {}) {
      super(options);

      /**
       * @param {String} nameRoom
       * @param {State} state
       * @param {Socket} socket
       */
      this.join = (...args) => {
         const result = Namespace.join(namespace, ...args);
         this.emit('join', result, ...args);
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
         return result;
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
};
