import StaticNotify from '../../static/Notify';

export default class State extends StaticNotify {
   /**
    * @param {Socket} socket
    * @param {StaticState} state
    * @param {Object} [options]
    */
   constructor(socket, state, options = {}) {
      super(options);
   };
};
