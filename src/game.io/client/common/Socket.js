import Notify from '../../common/Notify';
import io from 'socket.io-client';
import _ from 'lodash';

/**
 * Класс для работы с простраством сокетов
 */
export default class Socket extends Notify {

   /**
    * @param {String} name
    * @param {Object} [options]
    * @param {Object} [options.io]
    */
   constructor(name, options) {
      super(options);

      options = options instanceof Object ? options : {};

      const socket = io(name, _.merge({
         transports: ['websocket'],
         upgrade: false
      }, options.io));

      this.name = name;
      this.socket = socket;

      socket.on('socket:connection', this._connection);
      socket.on('socket:disconnecting', this._disconnecting);
      socket.on('socket:disconnect', this._disconnect);
   };

   _connection = (...args) => {
      this.emit('connection', ...args);
   };

   _disconnecting = (...args) => {
      this.emit('disconnecting', ...args);
   };

   _disconnect = (...args) => {
      this.emit('disconnect', ...args);
   };

}
