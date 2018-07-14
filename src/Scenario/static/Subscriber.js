export default class Subscriber {

   /**
    * @param {Object} handlers
    */
   constructor(handlers = {}) {
      this.handlers = {};
      this.on(handlers);
   };


   /**
    * @param {String|Object} nameEvent
    * @param {Function|Function[]} [callback]
    */
   on(...args) {
      on(this, 'handlers', ...args);
      return this;
   };

   /**
    * @param {String|Function} [nameEvent]
    * @param {Function|Function[]} [callback]
    */
   off(...args) {
      off(this, 'handlers', ...args);
      return this;
   };

};

/**
 * @param {Object} handlers
 * @param {String} nameEvent
 * @param {Function|Function[]} callback
 */
export function addHandler(handlers, nameEvent, callback) {
   if (!(handlers[nameEvent] instanceof Array)) {
      handlers[nameEvent] = [];
   }

   if (callback instanceof Function
      || callback instanceof Array) {
      handlers[nameEvent].push(callback);
   }
};

/**
 * @param {Object} context
 * @param {String} nameProp
 * @param {String|Object} nameEvent
 * @param {Function|Function[]} [callback]
 */
export function on(context, nameProp, nameEvent, callback) {
   const handlers = context[nameProp];
   const addHandlers = nameEvent instanceof Object ? nameEvent : {};

   if (typeof nameEvent === 'string') {
      addHandlers[nameEvent] = callback;
   }

   Object.keys(addHandlers).forEach(key => {
      addHandler(handlers, key, addHandlers[key]);
   });
};

/**
 * @param {Object[]} handlers
 * @param {Function} callback
 * @param {String} nameEvent
 */
export function offHandler(handlers, callback, nameEvent) {
   if (handlers[nameEvent] instanceof Array) {
      handlers[nameEvent] = handlers[nameEvent].filter(handler => {
         return handler !== callback;
      });

      if (!handlers[nameEvent].length) {
         delete handlers[nameEvent];
      }
   }
};

/**
 * @param {Object} context
 * @param {String} nameProp
 * @param {String} [nameEvent]
 * @param {Function|Function[]} [callback]
 */
export function off(context, nameProp, nameEvent, callback) {
   const handlers = context[nameProp];
   const callbackIsArr = callback instanceof Array;
   const existCallback = callback instanceof Function
      || callbackIsArr;
   const nameEventIsStr = typeof nameEvent === 'string';

   if (nameEvent instanceof Function || nameEvent instanceof Array) {
      Object.keys(handlers).forEach(offHandler.bind(this, handlers, nameEvent));
   } else if (nameEventIsStr && !existCallback) {
      delete handlers[nameEvent];
   } else if (nameEventIsStr && existCallback) {
      offHandler(handlers, callback, nameEvent);
   }else if (!(nameEvent instanceof Function) && !callbackIsArr && nameEvent instanceof Object) {
      Object.keys(nameEvent).forEach(nEvent => {
         off(context, nameProp, nEvent, nameEvent[nEvent]);
      });
   } else {
      context[nameProp] = {};
   }
};
