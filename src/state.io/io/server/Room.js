import StaticNotify from '../../static/Notify';
import { defProps } from '../../common';

export default class Room extends StaticNotify {
   /**
    * @param {Namespace} namespace
    * @param {String} name
    * @param {StaticState} state
    * @param {Object} [options]
    */
   constructor(namespace, name, state, options = {}) {
      super(options);

      defProps(this, {
         name: {
            get: () => name
         }
      });

      if (!state.rooms) {
         state.rooms = [];
      }

      if (state.rooms.indexOf(name) === -1) {
         state.rooms.push(name);

         this.on({
            change: () => {
               const args = [
                  'state:change',
                  state.collectValues()
               ];

               namespace.to(name).emit(...args);
               this.emit(...args);
            }
         }, state);
      }
   };
};
