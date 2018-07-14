/**
 * @param {Object} handlers
 * @param {String} name
 * @param {Function|Function[]} callback
 */
function addHandler(handlers, name, callback) {
   if (!(handlers[name] instanceof Array)) {
      handlers[name] = [];
   }

   if (callback instanceof Function
      || callback instanceof Array) {
      handlers[name].push(callback);
   }
};

/**
 * @param {Object} context
 * @param {String|Object} name
 * @param {Function|Function[]} [callback]
 */
function on(context, name, callback) {
   const addHandlers = name instanceof Object ? name : {};

   if (typeof name === 'string') {
      addHandlers[name] = callback;
   }

   Object.keys(addHandlers).forEach(key => {
      addHandler(context, key, addHandlers[key]);
   });
};

/**
 * @param {Strong} nameProp
 * @param {String} [nameEvent]
 * @param {Function|Function[]} callback
 */
function off(nameProp, nameEvent, callback) {
   const callbacks = this[nameProp][nameEvent];
   const isDelete = [];

   if (callbacks && callbacks.length) {
      if (callback) {
         callbacks.forEach((cb, index) => {
            if (cb === callback) {
               isDelete.push(index);
            }
         });

         this[nameProp][nameEvent] = callbacks.filter((cd, index) => {
            return isDelete.indexOf(index) === -1;
         });
      } else if (nameEvent) {
         delete this[nameProp][nameEvent];
      }
   }
};

export default class Notify {

   /**
    * @param {Object} handlers
    * @param {Object} handlersOnce
    */
   constructor(handlers, handlersOnce) {
      handlers = handlers instanceof Object ? handlers : {};
      handlersOnce = handlersOnce instanceof Object ? handlersOnce : {};

      this._handlers = {};
      this._handlersOnce = {};

      if (Object.keys(handlers).length) {
         this.on(handlers);
      }

      if (Object.keys(handlersOnce).length) {
         this.once(handlersOnce);
      }
   };

   /**
    * @param {String|Object} name
    * @param {Function|Function[]} [callback]
    */
   on(...args) {
      on(this._handlers, ...args);
      return this;
   };

   /**
    * @param {String|Object} name
    * @param {Function|Function[]} [callback]
    */
   once(...args) {
      on(this._handlersOnce, ...args);
      return this;
   };

   /**
    * @param {String} [name]
    * @param {Function|Function[]} callback
    */
   off(name, callback) {
      if (typeof name === 'string') {
         off.call(this, '_handlers', name, callback);
         off.call(this, '_handlersOnce', name, callback);
      } else {
         this._handlers = {};
         this._handlersOnce = {};
      }

      return this;
   };

   /**
    * @param {String} name
    * @param {Arguments} [...args]
    */
   emit(name, ...args) {
      const handlers = this._handlers[name] || [];
      const handlersOnce = this._handlersOnce[name] || [];
      const callbacks = handlers.concat(handlersOnce);
      let result;
      let callback;
      let callbackRes;

      if (callbacks && callbacks.length) {
         callbacks.forEach(callback => {
            if (callback instanceof Function) {
               callbackRes = callback.apply(this, args);

               result = callbackRes !== undefined ? callbackRes : result;
            } else if (callback instanceof Array) {
               const callbacksRes = [];
               let cback;

               for (let index = 0; index < callback.length; index++) {
                  cback = callback[index];

                  if (cback instanceof Function) {
                     callbackRes = cback.apply(this, args.concat(callbacksRes));

                     if (callbackRes instanceof Error) {
                        break;
                     } else if (callbackRes !== undefined) {
                        callbacksRes.push(callbackRes);
                        result = callbackRes;
                     }
                  } else if (cback !== undefined) {
                     callbacksRes.push(cback);
                  }
               }
            }
         });

         delete this._handlersOnce[name];
      }

      return result;
   };

}
