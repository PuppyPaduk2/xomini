import Notify from '../../common/Notify';

/**
 * Класс для работы с простраством сокетов
 */
export default class Namespace extends Notify {

   /**
    * @param {Socket.io} io
    * @param {String} name
    * @param {Object} options
    */
   constructor(io, name, options) {
      super(options);

      options = options instanceof Object ? options : {};

      this.io = io;
      this.name = name;

      let namespace = this.namespace;

      if (!namespace) {
         io.of(name);

         namespace = this.namespace;

         this.emit('create', namespace);

         namespace.on('connection', socket => {
            namespace.emit('socket:connection', this.emit('connection', socket));

            socket.on('disconnecting', () => {
               namespace.emit('socket:disconnecting', this.emit('disconnecting', socket));
            });

            socket.on('disconnect', () => {
               namespace.emit('socket:disconnect', this.emit('disconnect', socket));
            });
         });
      }
   };

   /**
    * @returns {Namespace}
    */
   get namespace() {
      return this.io.nsps[this.name];
   };

   /**
    * @returns {Object}
    */
   get sockets() {
      return this.namespace.sockets;
   };

   /**
    * @returns {String[]}
    */
   get socketsId() {
      return Object.keys(this.sockets);
   };

   /**
    * @param {Object[]}
    */
   get socketsParams() {
      return this.socketsId.map((id, index) => {
         const params = this.emit('getSocketParams', this.sockets[id], index);
         return params instanceof Object ? params : { id: id };
      });
   };

}
