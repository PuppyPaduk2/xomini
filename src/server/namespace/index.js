/**
 * @param {Namespace} namespace
 * @param {Object} callbacks
 * @param {Object} [options]
 * @param {Store} [options.store]
 */
export default function(namespace, callbacks = {}, options = {}) {
   const { store } = options;

   namespace.on('connection', socket => {
      const common = {
         socket,
         store: store,
         dispatch: store && store.dispatch,
         getState: store && store.getState,
         socketEmit: (actions, rooms = []) => emit(socket, actions, rooms),
         namespaceEmit: (actions, rooms = []) => emit(namespace, actions, rooms)
      };

      Object.keys(callbacks).forEach(nameEvent => {
         let eventCallbacks = callbacks[nameEvent];

         if (eventCallbacks instanceof Function) {
            eventCallbacks = [eventCallbacks];
         }

         eventCallbacks.forEach(callback => {
            subscribe(common, nameEvent, callback);
         });
      });
   });
};

/**
 * @param {Socket} socket
 * @param {String} nameEvent
 * @param {Function} callback
 */
export function subscribe(common, nameEvent, callback) {
   const { socket } = common;

   socket.on(nameEvent, (...args) => {
      const cbResult = callback.call(socket, common, ...args) || {};

      if ('result' in cbResult) {
         socket.emit(nameEvent + ':result', cbResult.result);
      }
   });
};

/**
 * @param {Object[]} actions
 * @param {String[]|String} [rooms]
 */
function emit(emitter, actions, rooms = []) {
   rooms = (typeof rooms === 'string') ? [rooms] : rooms;

   emitter = rooms.reduce((memo, nameRoom) => {
      return memo.to(nameRoom);
   }, emitter);

   emitter.emit('actions', ...actions);
};
