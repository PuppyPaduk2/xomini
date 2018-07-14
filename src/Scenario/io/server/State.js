import StaticState from '../../static/State';

export default class State {

   /**
    * @param {Socket} value
    */
   set socket(value) {
      this._socket = value;
   };

   /**
    * @returns {Socket}
    */
   get socket() {
      return this._socket || null;
   };

   /**
    * @param {StaticState} value
    */
   set state(value) {
      if (value instanceof StaticState) {
         this._state = value;
      }
   };

   get state() {
      return this._state || null;
   };

   /**
    * @param {Socket} socket
    * @param {StaticState} state
    */
   constructor(socket, state) {
      this.socket = socket;
      this.state = state;
   };

}
