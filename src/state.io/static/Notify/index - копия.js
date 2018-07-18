import { defProps } from '../common';

export default class Notify {
   /**
    * @param {Object} [options]
    * @param {Object} [options.on]
    * @param {Object} [options.once]
    */
   constructor(options = {}) {
      let handlers = {};

      defProps(this, {
         events: {
            /**
             * @returns {String[]}
             */
            get: () => {
               return Object.keys(handlers);
            }
         },
         countHandlers: {
            /**
             * @returns {Object}
             */
            get: () => {
               return this.events.reduce((result, ev) => {
                  result[ev] = handlers[ev].reduce((result, config) => {
                     if (config.once) {
                        result.once++;
                     } else {
                        result.on++;
                     }

                     return result;
                  }, { on: 0, once: 0 });

                  return result;
               }, {});
            }
         }
      });

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.on = (addHandlers = {}, context = null) => {
         handlersOn.call(this, handlers, addHandlers, context);
         return this;
      };

      /**
       * @param {Object} addHandlers
       * @param {Notify} [context]
       */
      this.once = (addHandlers, context = null) => {
         handlersOn.call(this, handlers, addHandlers, context, true);
         return this;
      };

      /**
       * @param {String|Object|Function|<Function|String>[]} subHandlers
       * @param {Notify} context
       */
      this.off = (subHandlers, context = null) => {
         if (subHandlers === undefined) {
            this.off(onlyCallbacks(handlers));
         } else if (typeof subHandlers === 'string' && handlers[subHandlers]) {
            this.off({ [subHandlers]: onlyCallbacksEvent(handlers[subHandlers]) }, context);
         } else if (subHandlers instanceof Notify) {
            // this.off(onlyCallbacks(handlers, subHandlers), subHandlers);
         } else if (subHandlers instanceof Function) {
         } else if (subHandlers instanceof Array) {
         } else if (subHandlers instanceof Object) {
            Object.keys(subHandlers).forEach(nameEvent => {
               if (subHandlers[nameEvent] instanceof Function) {
                  subHandlers[nameEvent] = [subHandlers[nameEvent]];
               }

               subHandlers[nameEvent].forEach(callback => {
                  handlers[nameEvent] = handlers[nameEvent].filter(cfg => {
                     if (cfg.callback === callback) {
                        if (cfg.context !== this) {
                           cfg.context.off({
                              [nameEvent]: cfg.callback
                           });
                        }
                     } else {
                        return true;
                     }

                     // if (context) {
                     //    console.log(1)
                     // } else {
                     //    if (cfg.context !== this) {
                     //       cfg.context.off({
                     //          [nameEvent]: cfg.callback
                     //       });
                     //       return false;
                     //    } else 
                     // }
                     // return true;
                  });

                  if (!handlers[nameEvent].length) {
                     delete handlers[nameEvent];
                  }
               });
            });
         }

         return this;
      };

      /**
       * @param {String} nameEvent
       * @param {Array} [...args]
       */
      this.emit = (nameEvent, ...args) => {
         let handlersEvent = handlers[nameEvent];
         let isBreak = false;
         let result;

         if (handlersEvent instanceof Array && handlersEvent.length) {
            handlers[nameEvent] = handlersEvent.filter(options => {
               if (!isBreak && options.context === this) {
                  let prevResult = result;

                  result = options.callback.call(this, ...args, result);

                  if (result instanceof Error) {
                     result.prevResult = prevResult;
                     isBreak = true;
                  } else if (result === undefined && prevResult !== undefined) {
                     result = prevResult;
                  }
               }

               return !options.once;
            });

            if (!handlers[nameEvent].length) {
               delete handlers[nameEvent];
            }
         }

         return result;
      };

      this.on(options.on);
      this.once(options.once);
   };
};

/**
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.once]
 * @param {Object} [options.context]
 */
function configHandler(callback, options = {}) {
   return callback instanceof Function ? {
      callback: callback,
      once: !!options.once,
      context: options.context || null
   } : null;
};

/**
 * @param {Object} handlers
 * @param {Object} addHamdlers
 * @param {Notify} context
 */
function handlersOn(handlers, addHandlers = {}, context = null, once = false) {
   if (handlers instanceof Object) {
      context = context instanceof Notify ? context : null;

      Object.keys(addHandlers).forEach(nameEvent => {
         const callbacks = addHandlers[nameEvent] instanceof Array
            ? addHandlers[nameEvent]
            : [addHandlers[nameEvent]];

         if (!(handlers[nameEvent] instanceof Array)) {
            handlers[nameEvent] = [];
         }

         callbacks.forEach(callback => {
            const cfg = configHandler(callback, {
               context: context || this,
               once: once
            });

            if (cfg) {
               handlers[nameEvent].push(cfg);

               // if (context) {
                  // context[once ? 'once' : 'on']({
                  //    [nameEvent]: callback
                  // });
               // }
            }
         });
      });
   }
};

function onlyCallbacksEvent(handlersEvent, context) {
   return handlersEvent.map(cfg => {
      if (!context || (context && cfg.context === context)) {
         return cfg.callback;
      }
   }).filter(callback => !!callback);
};

function onlyCallbacks(handlers, context) {
   return Object.keys(handlers).reduce((result, nameEvent) => {
      result[nameEvent] = onlyCallbacksEvent(handlers[nameEvent], context);
      return result;
   }, {})
};
