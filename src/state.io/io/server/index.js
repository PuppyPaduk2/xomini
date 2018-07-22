/**
 * @param {Namespace} io
 * @param {Object} on
 */
export default function(io, on = {}) {
   io.on('connection', (socket) => {
      Object.keys(on).forEach(nameEvent => {
         if (on[nameEvent] instanceof Function) {
            socket.on(nameEvent, on[nameEvent].bind(io, socket));
         }
      });

      socket.on('disconnecting', () => {
         // ...code
      });
   });
};

/**
 * @param {Object} sockets
 */
function socketsInRoom(sockets) {
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
