export default {

   /**
    * @param {Namespace} namespace
    */
   getSockets: function(namespace) {
      const sockets = namespace.sockets;

      return {
         sockets: sockets,
         ids: Object.keys(sockets)
      };
   },

   /**
    * @param {Namespace} namespace
    */
   getSocketsParams: function(namespace) {
      const { sockets, ids } = this.getSockets(namespace);

      return ids.map((id, index) => {
         const socket = sockets[id];

         return {
            index: index,
            name: socket.name
               || socket.handshake.query.name
               || ['Player', index + 1].join(' ')
         };
      });
   },

   /**
    * @param {Function} callback
    * @param {Object} callbackParams
    */
   getParams: function(callback, callbackParams) {
      let params = {};

      if (callback instanceof Function) {
         params = callback(callbackParams);
      }

      if (typeof params === 'string') {
         return params;
      } else {
         return params instanceof Object ? params : {};
      }
   },

   /**
    * @param {Namespace} namespace
    * @param {String} nameEvent
    * @param {Object|String} params
    */
   emit: function(namespace, nameEvent, params) {
      if (typeof params === 'string') {
         namespace.emit([nameEvent, 'Error'].join(''), params);
      } else if (params instanceof Object) {
         namespace.emit(nameEvent, params);
      }

      return namespace;
   },

   /**
    * @param {*} io
    * @param {String} path
    * @param {Object} [options]
    * @param {Function} [options.connection]
    * @param {Function} [options.disconnecting]
    * @param {Function} [options.disconnect]
    * 
    * @return {Namespace}
    */
   namespace: function(io, path, options) {
      let namespace;

      options = options instanceof Object ? options : {};

      if (Object.keys(io.nsps).indexOf(path) === -1) {
         namespace = io.of(path);

         if (options.createNamespace instanceof Function) {
            options.createNamespace(namespace);
         }

         namespace.on('connection', socket => {
            this.emit(
               namespace,
               'initConnection',
               this.getParams(options.connection, {
                  namespace: namespace,
                  socket: socket
               })
            );

            socket.on('disconnecting', () => {
               Object.keys(socket.rooms).forEach(key => {
                  socket.to(key).emit('leave');
               });

               this.emit(
                  namespace,
                  'initDisconnecting',
                  this.getParams(options.disconnecting, {
                     namespace: namespace,
                     socket: socket
                  })
               );
            });

            socket.on('disconnect', () => {
               this.emit(
                  namespace,
                  'initDisconnect',
                  this.getParams(options.disconnect, {
                     namespace: namespace,
                     socket: socket
                  })
               );
            });
         });
      } else {
         namespace = io.nsps[path];
      }

      return namespace;
   },

   /**
    * @param {Socket} socket
    * @param {String} room
    * @param {Object} options
    * @param {Function} [options.join]
    */
   room: function(socket, room, callback) {
      return socket.join(room, () => {
         this.emit(
            socket.to(room),
            'join',
            this.getParams(callback)
         );
      });
   }

};
