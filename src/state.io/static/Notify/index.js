import { defProps } from '../common';

export default class Notify {
   /**
    * @param {Object} [options]
    * @param {Object} [options.on]
    * @param {Object} [options.once]
    */
   constructor(options = {}) {
      let handlers = {};
      let on = {};
      let once = {};

      defProps(this, {
         handlers: {
            get: () => {
               return { on: on, once: once };
            }
         }
      });

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.on = (addHandlers = {}, context = null) => {
         if (context) {
            if (context === this) {
               console.log(123)
            } else {

            }
         } else {
            this.on(addHandlers, this);
         }

         // Object.keys(addHandlers).forEach(nameEvent => {
         //    const addHandlersEvents = addHandlers[nameEvent] instanceof Array
         //       ? addHandlers[nameEvent]
         //       : [addHandlers[nameEvent]];

         //    if (!(handlers[nameEvent] instanceof Array)) {
         //       handlers[nameEvent] = [];
         //    }

         //    if (!(on[nameEvent] instanceof Array)) {
         //       on[nameEvent] = [];
         //    }

         //    addHandlersEvents.forEach(handler => {
         //       handler = {
         //          value: handler,
         //          context: context || this
         //       };
         //       handlers[nameEvent].push(handler);
         //       on[nameEvent].push(handler);
         //    });
         // });

         return this;
      };

      this.on(options.on);
   };
};
