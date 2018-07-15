/**
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.once]
 * @param {Object} [options.context]
 */
function defOptionsHandler(callback, options = {}) {
   return callback instanceof Function
      ? {
         callback: callback,
         once: !!options.once,
         context: options.context instanceof Object
            ? options.context
            : null
      }
      : null;
};

/**
 * @param {Object} handlers
 * @param {String} nameEvent
 * @param {Function|Function[]} callback
 * @param {Object} [options]
 */
function onHandler(handlers, nameEvent, callback, options = {}) {
   const callbacks = callback instanceof Function
      ? [callback]
      : callback;

   if (!(handlers[nameEvent] instanceof Array)) {
      handlers[nameEvent] = [];
   }

   if (callbacks instanceof Array && callbacks.length) {
      callbacks.forEach(callback => {
         let optionsHandler = defOptionsHandler(callback, options);

         if (optionsHandler) {
            handlers[nameEvent].push(optionsHandler);
         }
      });
   }
};

/**
 * @param {Object} context
 * @param {Object} options
 * @param {Array} [args]
 * @param {*} result
 */
function callHandler(context, options, args = [], result) {

   handlerResult = handler.call(context, ...args, result);

   if (handlerResult instanceof Error) {
      result = `Error:${handlerResult.message}`;
   }

   return result;
};
/**
 * @param {Object[]} handlers
 * @param {Function} callback
 * @param {String} nameEvent
 * @param {Object} context
 */
export function offHandler(handlers, callback, nameEvent, context) {
   if (handlers[nameEvent] instanceof Array) {
      handlers[nameEvent] = handlers[nameEvent].filter(options => {
         return options.callback !== callback;
      });

      if (!handlers[nameEvent].length) {
         delete handlers[nameEvent];
      }
   }
};

/**
 * @param {Object} handlers
 * @param {String|Object} nameEvent
 * @param {Function|Function[]} [callback]
 * @param {Object} [options]
 */
export function on(handlers, nameEvent, callback, options = {}) {
   const addHandlers = nameEvent instanceof Object ? nameEvent : {};

   if (typeof nameEvent === 'string') {
      addHandlers[nameEvent] = callback;
   }

   Object.keys(addHandlers).forEach(nameEvent => {
      onHandler(handlers, nameEvent, addHandlers[nameEvent], options);
   });
};

/**
 * @param {Object} handlers
 * @param {String|Object|Function|<Function|String>[]} nameEvent
 * @param {Function|Function[]} [callback]
 * @param {Object} context
 */
export function off(handlers, nameEvent, callback, context) {
   if (typeof nameEvent === 'string') {
      if (!callback) {
         delete handlers[nameEvent];
      } else if (callback instanceof Function) {
         offHandler(handlers, callback, nameEvent, context);
      } else if (callback instanceof Array) {
         callback.forEach(elemCallback => {
            offHandler(handlers, elemCallback, nameEvent, context);
         });
      }
   } else if (nameEvent instanceof Object) {
      if (nameEvent instanceof Function) {
         Object.keys(handlers).forEach(key => {
            off(handlers, key, nameEvent, context);
         });
      } else if (nameEvent instanceof Array) {
         nameEvent.forEach(value => {
            off(handlers, value, null, context);
         });
      } else {
         Object.keys(nameEvent).forEach(key => {
            off(handlers, key, nameEvent[key], context);
         });
      }
   }
};

/**
 * @param {Object} handlers
 * @param {String|Object} nameEvent
 * @param {Array} [...args]
 *
 * @param {*}
 */
export function emit(handlers = {}, nameEvent, ...args) {
   let result;
   let handlersEvent = handlers[nameEvent];
   let isBreak = false;

   if (handlersEvent instanceof Array && handlersEvent.length) {
      handlers[nameEvent] = handlersEvent.filter(options => {
         if (!isBreak) {
            let prevResult = result;

            result = options.callback.call(
               options.context,
               ...args,
               result
            );

            if (result instanceof Error) {
               result.prevResult = prevResult;
               isBreak = true;
            }
         }

         return !options.once;
      });
   }

   return result;
};
