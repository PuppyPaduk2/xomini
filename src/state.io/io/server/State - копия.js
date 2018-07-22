import StaticNotify from '../../static/Notify';
import StaticState from '../../static/State';
import { defProps } from '../../common';

export default class State extends StaticNotify {
   /**
    * @param {Socket} socket
    * @param {StaticState} state
    */
   constructor(defSocket, defState) {
      super();

      let socket = null;
      let state = null;

      defProps(this, {
         socket: {
            set: (value) => {
               socket = value || null;
            }
         },
         state: {
            /**
             * @param {StaticState} value
             */
            set: (value) => {
               if (value instanceof StaticState) {
                  if (state instanceof StaticState) {
                     this.off(state);
                  }

                  if (socket && !socket.state) {

                  }
                  this.on({
                     change: () => {
                        if (socket) {
                           socket.emit('state:change', state.collectValues());
                        }
                     }
                  }, value);

                  state = value;
               }
            }
         },
         values: {
            get: () => {
               return state ? state.values : {};
            },
            set: (newValues) => {
               if (state) {
                  state.values = newValues;
               }
            }
         }
      })

      this.socket = defSocket;
      this.state = defState;
   };
};
