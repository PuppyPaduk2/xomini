import { defProps } from '../common';

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
         },
         event: {
            /**
             * @param {String} event
             * @param {String} event.nameEvent
             * @param {Array} event.args
             */
            set: (event) => {
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
         if (typeof nameEvent === 'string') {
            let listenersEvent = listeners[nameEvent];

            if (listenersEvent instanceof Array) {
               listenersEvent.forEach(listener => {
                  listener.event = {
                     name: nameEvent,
                     args: args,
                     context: this
                  };
               });
            }
         }

         return this;
      };

      this.on(options.on);
      this.once(options.once);
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

/**
 * @param {Object} handlers
 * @param {Object} addHandlers
 * @param {Notify} [context]
 * @param {Boolean} [once]
 */
function onHadlers(handlers, addHandlers = {}, context = null, once = false) {
   Object.keys(addHandlers).forEach(nameEvent => {
      if (!(context instanceof Notify)) {
         context = this;
      }

      context.addListener(this, nameEvent);

      let addHandlersEvent = addHandlers[nameEvent];

      if (!(addHandlersEvent instanceof Array)) {
         addHandlersEvent = [addHandlersEvent];
      }

      addHandlersEvent.forEach(handler => {
         handler = {
            callback: handler,
            context: context,
            once: !!once
         };

         eventExist(handlers, nameEvent);
         handlers[nameEvent].push(handler);
      });
   });
};

/**
 * 
 * @param {Object} handlers
 * @param {Object} handlersOnce
 * @param {String} nameEvent
 * @param {notify} context
 * @param {Function} callback
 */
function handlersFilter(handlers, nameEvent, context = null, callback) {
   const notremoveContext = {};
   const removeContext = {};

   if (handlers && handlers[nameEvent] instanceof Array) {
      handlers[nameEvent] = handlers[nameEvent].filter((handler, index) => {
         let result = true;

         if (handler.context === context || context === null) {
            if (callback instanceof Function) {
               result = callback.call(this, handler);
            }

            result = typeof result === 'boolean' ? result : true;
         }

         eventExist(notremoveContext, nameEvent);
         eventExist(removeContext, nameEvent);

         if (result) {
            let index = removeContext[nameEvent].indexOf(handler.context);

            notremoveContext[nameEvent].push(handler.context);

            if (index !== -1) {
               removeContext[nameEvent].splice(index, 1);
            }
         } else if (notremoveContext[nameEvent].indexOf(handler.context) === -1) {
            removeContext[nameEvent].push(handler.context);
         }

         if (handlers[nameEvent].length - 1 === index) {
            if (!notremoveContext[nameEvent].length) {
               delete notremoveContext[nameEvent];
            }

            if (!removeContext[nameEvent].length) {
               delete removeContext[nameEvent];
            }
         }

         return result;
      });

      if (!handlers[nameEvent].length) {
         delete handlers[nameEvent];
      }
   }

   Object.keys(removeContext).forEach(nameEvent => {
      removeContext[nameEvent].forEach(context => {
         context.subListener(this, nameEvent);
      });
   });

   return (callback) => {
      callback.call(this, removeContext, notremoveContext);
   };
};

/**
 * @param {Object} contexts
 */
function removeContexts(contexts) {
   Object.keys(contexts).forEach(nameEvent => {
      contexts[nameEvent].forEach(context => {
         context.subListener(this, nameEvent);
      });
   });
};
