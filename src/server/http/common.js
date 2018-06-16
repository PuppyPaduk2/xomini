export default {

   getSockets: function(namespace) {
      const sockets = namespace.sockets;

      return {
         sockets: sockets,
         ids: Object.keys(sockets)
      };
   },

   getSocketsParams: function(namespace) {
      const {sockets, ids} = this.getSockets(namespace);

      return ids.map((id, index) => {
         const socket = sockets[id];

         return {
            name: socket.name
               || socket.handshake.query.name
               || ['Player', index + 1].join(' ')
         };
      });
   },

   /**
    * @param {*} io
    * @param {String} path
    * @param {Function} [connection]
    * @param {Function} [disconnect]
    * @return {Namespace}
    */
   namespace: function(io, path, connection, disconnect) {
      let namespace;

      if (Object.keys(io.nsps).indexOf(path) === -1) {
         namespace = io.of(path);

         namespace.on('connection', socket => {
            namespace.emit('initConnection', this.getSocketsParams(namespace));

            console.log(socket.handshake.query);

            if (connection instanceof Function) {
               connection(namespace, socket);
            }

            socket.on('disconnect', () => {
               if (disconnect instanceof Function) {
                  disconnect(namespace, socket);
               }

               namespace.emit('initDisconnect', this.getSocketsParams(namespace));
            });
         });
      } else {
         namespace = io.nsps[path];
      }

      return namespace;
   }

};
