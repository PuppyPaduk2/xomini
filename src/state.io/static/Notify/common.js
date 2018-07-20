import Notify from '.';

/**
 * @param {Object} handlers
 * @param {Array} nameEvent
 */
export function eventExist(handlers, nameEvent) {
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
export function onHadlers(handlers, addHandlers = {}, context = null, once = false) {
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
export function handlersFilter(handlers, nameEvent, context = null, callback) {
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