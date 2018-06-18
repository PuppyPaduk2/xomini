import io from 'socket.io-client';
import _ from 'lodash';

/**
 * @param {String[]} [url]
 */
export default function createSocket(url, options) {
   options = options instanceof Object
      ? options
      : {};

   options = _.merge({
      transports: ['websocket'],
      upgrade: false
   }, options);

   return io(url, options);
}
