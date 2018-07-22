import StaticNotify from '../../static/Notify';
import Room from './Room';
import { defProps } from '../../common';

export default class Socket extends StaticNotify {
   /**
    * @param {Namespace} namespace
    * @param {Socket} socket
    * @param {Object} [options]
    */
   constructor(namespace, socket, options = {}) {
      super(options);

      /**
       * @param {String} nameRoom
       * @param {StaticState} state
       * @param {Function} callback
       */
      this.join = (nameRoom, state, callback) => {
         socket.join(nameRoom, () => {
            if (callback instanceof Function) {
               callback.call(this, nameRoom, state);
            }

            this.emit('join', nameRoom, state);
         });

         stateAddRoom.call(this, namespace, socket, nameRoom, state);

         this.emit('joining', nameRoom, state);
      };

      socket.on('disconnecting', () => {
         this.emit('disconnecting');
      });

      socket.on('disconnect', () => {
         this.emit('disconnect');
      });
   };
};

function stateAddRoom(namespace, socket, name, state) {
   if (!state.rooms) {
      state.rooms = [];
   }

   if (state.rooms.indexOf(name) === -1) {
      state.rooms.push(name);

      this.on({
         change: () => {
            const args = [
               'state:change',
               state.collectValues()
            ];

            namespace.to(name).emit(...args);
            this.emit(...args);
         }
      }, state);
   }
};
