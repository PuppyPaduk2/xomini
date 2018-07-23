import StaticNotify from '../../static/Notify';
import StaticState from '../../static/State';
import { defProps } from '../../common';

export default class State extends StaticNotify {
   /**
    * @param {Socket} socket
    * @param {StaticState} state
    * @param {Object} [options]
    * @param {Object} [options.sockets]
    */
   constructor(defState, options = {}) {
      super(options);
   };
};
