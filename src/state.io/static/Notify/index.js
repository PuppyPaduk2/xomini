import { defProps } from '../../common';
import { eventExist, onHadlers, handlersFilter, eachEventConfig } from './common';

export default class Notify {
   /**
    * @param {Object} [options]
    * @param {Object} [options.on]
    * @param {Object} [options.once]
    */
   constructor(options = {}) {
      let handlers = {};
      let listeners = {};

      defProps(this, {
         listeners: {
            get: () => {
               return listeners;
            }
         },
         handlers: {
            get: () => {
               return handlers;
            }
         }
      });

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.on = (addHandlers = {}, context = null) => {
         onHadlers.call(this, handlers, addHandlers, context);
         return this;
      };

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.once = (addHandlers = {}, context = null) => {
         onHadlers.call(this, handlers, addHandlers, context, true);
         return this;
      };

      /**
       * @param {Object} subHandlers
       * @param {Notify} context
       */
      this.off = (subHandlers, context = null) => {
         if (subHandlers === undefined) {
            Object.keys(handlers).forEach(nameEvent => {
               handlersFilter.call(this, handlers, nameEvent, null, () => false);
            });
         } else if (subHandlers instanceof Notify) {
            Object.keys(handlers).forEach(nameEvent => {
               handlersFilter.call(this, handlers, nameEvent, subHandlers, () => false);
            });
         } else if (subHandlers instanceof Object) {
            Object.keys(subHandlers).forEach(nameEvent => {
               let subHandlersEvent = subHandlers[nameEvent] instanceof Array
                  ? subHandlers[nameEvent]
                  : [subHandlers[nameEvent]];

               handlersFilter.call(this, handlers, nameEvent, context, (handler) => {
                  return subHandlersEvent.indexOf(handler.callback) === -1;
               });
            });
         }

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
         return this;
      };

      /**
       * @param {Notify} listener
       * @param {String} nameEvent 
       */
      this.subListener = (listener, nameEvent) => {
         if (typeof nameEvent === 'string' && listener instanceof Notify) {
            const index = listeners[nameEvent].indexOf(listener);

            if (index !== -1) {
               listeners[nameEvent].splice(index, 1);
            }
         }
         return this;
      };

      /**
       * @param {String} nameEvent
       */
      this.emit = (nameEvent, ...args) => {
         let result = [];

         if (typeof nameEvent === 'string') {
            let listenersEvent = listeners[nameEvent];

            if (listenersEvent instanceof Array) {
               result = listenersEvent.reduce((memory, listener) => {
                  let resultEmitEvent = listener.emitEvent({
                     name: nameEvent,
                     args: args,
                     context: this
                  });

                  if (resultEmitEvent !== undefined) {
                     memory.push(resultEmitEvent);
                  }

                  return memory;
               }, result);
            }
         }

         return result;
      };

      /**
       * @param {String} event
       * @param {String} event.name
       * @param {Array} event.args
       */
      this.emitEvent = (event) => {
         let isBreak = false;
         let handlerResult;

         handlersFilter(handlers, event.name, event.context, (handler) => {
            if (!isBreak) {
               if (handlerResult !== undefined) {
                  handlerResult = handler.callback.call(this, handlerResult, ...event.args);
               } else {
                  handlerResult = handler.callback.apply(this, event.args);
               }

               if (handlerResult instanceof Error) {
                  isBreak = true;
               }

               return !handler.once;
            }
         });

         return handlerResult;
      };

      /**
       * @param {Object} hasHandler
       * @param {Notify} context
       */
      this.hasHandler = (hasHandler, context = null) => {
         let result = false;

         if (hasHandler instanceof Notify) {
            eachEventConfig.call(this, handlers, (handler) => {
               if (handler.context === hasHandler) {
                  result = true;
               }
            });
         } else if (hasHandler instanceof Function) {
            eachEventConfig.call(this, handlers, (handler) => {
               let isContext = handler.context === context || context === null;

               if (isContext && handler.callback === hasHandler) {
                  result = true;
               }
            });
         }

         return result;
      };

      /**
       * @param {Notify}
       */
      this.hasListener = (hasListener) => {
         let result = false;

         if (hasListener instanceof Notify) {
            eachEventConfig.call(this, listeners, listener => {
               if (hasListener === listener) {
                  result = true;
               }
            });
         }

         return result;
      };

      this.on(options.on);
      this.once(options.once);
   };
};
