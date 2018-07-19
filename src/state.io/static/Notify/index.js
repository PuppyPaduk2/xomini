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
      let listeners = {};

      defProps(this, {
         handlers: {
            get: () => {
               return { on: on, once: once };
            }
         },
         event: {
            /**
             * @param {String} event
             * @param {String} event.nameEvent
             * @param {Array} event.args
             */
            set: (event) => {
               console.log(event);
            }
         }
      });

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.on = (addHandlers = {}, context = null) => {
         Object.keys(addHandlers).forEach(nameEvent => {
            if (context instanceof Notify) {
               context.addListener(this, nameEvent);
            } else {
               this.addListener(this, nameEvent);
            }

            let addHandlersEvent = addHandlers[nameEvent];

            if (!(addHandlersEvent instanceof Array)) {
               addHandlersEvent = [addHandlersEvent];
            }

            addHandlersEvent.forEach(handler => {
               eventExist(handlers, nameEvent);
               eventExist(on, nameEvent);

               handlers[nameEvent].push(handler);
               on[nameEvent].push(handler);
            });
         });

         return this;
      };

      /**
       * @param {Notify} listener
       * @param {String} nameEvents
       */
      this.addListener = (listener, nameEvent) => {
         if (typeof nameEvent === 'string' && listener instanceof Notify) {
            eventExist(listeners, nameEvent);

            if (listeners[nameEvent].indexOf(listener) === -1) {
               listeners[nameEvent].push(listener);
            }
         }
      };

      /**
       * @param {String} nameEvent
       */
      this.emit = (nameEvent, ...args) => {
         if (typeof nameEvent === 'string') {
            let listenersEvent = listeners[nameEvent];

            if (listenersEvent instanceof Array) {
               listenersEvent.forEach(listener => {
                  listener.event = {
                     nameEvent: nameEvent,
                     args: args
                  };
               });
            }
         }

         return this;
      };

      this.on(options.on);
   };
};

/**
 * @param {Object} handlers
 * @param {Array} nameEvent
 */
function eventExist(handlers, nameEvent) {
   if (!(handlers[nameEvent] instanceof Array)) {
      handlers[nameEvent] = [];
   }
};
