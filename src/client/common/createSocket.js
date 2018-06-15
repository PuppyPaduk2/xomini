/**
 * @param {String[]} [url]
 */
export default function createSocket(url, options) {
   options = options instanceof Object
      ? options
      : { transports: ['websocket'], upgrade: false };

   return io(url, options);
}
