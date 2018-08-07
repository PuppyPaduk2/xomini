/**
 * @param {Namespace} namespace
 * @param {Object} callbacks
 */
export default function(namespace, callbacks = {}) {
   namespace.on('connection', socket => {
      Object.keys(callbacks).forEach(nameEvent => {
         let eventCallbacks = callbacks[nameEvent];

         if (eventCallbacks instanceof Function) {
            eventCallbacks = [eventCallbacks];
         }

         eventCallbacks.forEach(callback => {
            subscribe(socket, nameEvent, callback);
         });
      });
   });
};

/**
 * @param {Socket} socket
 * @param {String} nameEvent
 * @param {Function} callback
 */
export function subscribe(socket, nameEvent, callback) {
   socket.on(nameEvent, (...args) => {
      const { result } = callback.call(socket, ...args) || {};

      if (result) {
         socket.emit(nameEvent + ':result', result);
      }
   });
};
