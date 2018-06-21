import Namespace from './Namespace';
/**
 * Класс для работы игровым пространство сокетов
 */
export default class GameNamespace extends Namespace {

   /**
    * @param {Socket.io} io
    * @param {String} name
    * @param {Object} options
    */
   constructor(io, name, options) {
      super(io, name, options);

      options = options instanceof Object ? options : {};

      this.begin = false;
      this.end = false;

      this.stateProps = options.stateProps instanceof Array
         ? options.stateProps
         : ['begin', 'end', 'players', '_sendState'];

      this.on({
         connection: this._sendState,
         disconnect: this._sendState,
         getSocketParams: this._getSocketParams
      });
   };

   get state() {
      return this.stateProps.reduce((result, nameProp) => {
         result[nameProp] = this[nameProp];
         return result;
      }, {});
   };

   get players() {
      return this.socketsParams;
   };

   _sendState = () => {
      return this.state;
   };

   _getSocketParams = (socket, index) => {
      return {
         name: socket.name
            || socket.handshake.query.name
            || ['Player', index + 1].join(' ')
      };
   };


}
