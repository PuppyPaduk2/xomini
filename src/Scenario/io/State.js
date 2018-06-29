import StaticState from '../static/State';

export default class State extends StaticState {

   /**
    * @param {Socket} socket
    * @param {Object} values
    * @param {Object} [options]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(socket, values, options) {
      super(values, options);

      if (socket) {
         this.socket = socket;

         socket.emit('state:create', this.values)
      } else {
         this.socket = null;
      }

      this.on({
         change: this._onChange
      });
   };

   /**
    * @param {Object} values
    */
   _onChange(values) {
      if (this.socket) {
         this.socket.emit('state:change', values);
      }
   };

}
