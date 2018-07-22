import StaticNotify from '../../static/Notify';
import SocketState from './Socket';

export default class Namespace extends StaticNotify {
   /**
    * @param {Server} server
    * @param {Object} [options]
    * @param {Object} [options.handlers]
    */
   constructor(server, options = {}) {
      super(options);

      let handlers = options.handlers;

      server.on('connection', (socket) => {
         console.log('@connection');

         let socketState = new SocketState(server, socket);

         if (handlers) {
            Object.keys(handlers).forEach(nameEvent => {
               if (handlers[nameEvent] instanceof Function) {
                  socket.on(
                     nameEvent,
                     handlers[nameEvent].bind(this, socketState)
                  );
               }
            });
         }

         this.on({
            'state:change': () => {
               console.log('@state:change');
            }
         }, socketState);
      });
   };
};
