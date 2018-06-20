/**
 * @param {Object} event
 * @param {String} name
 * @param {Function|Function[]} callback
 */
function addEvent(events, name, callback) {
   if (!(events[name] instanceof Array)) {
      events[name] = [];
   }

   if (callback instanceof Function
   || callback instanceof Array) {
      events[name].push(callback);
   }
}

export default class Notify {
   _events = {};

   /**
    * @param {Object} options
    */
   constructor(options) {
      options = options instanceof Object ? options : {};

      if (options.events instanceof Object) {
         this.on(options.events);
      }
   };

   /**
    * @param {String|Object} name
    * @param {Function|Function[]} [callback]
    */
   on(name, callback) {
      const addEvents = name instanceof Object ? name : {};

      if (typeof name === 'string') {
         addEvents[name] = callback;
      }

      Object.keys(addEvents).forEach(key => {
         addEvent(this._events, key, addEvents[key]);
      });

      return this;
   };

   /**
    * @param {String} name
    * @param {Function|Function[]} callback
    */
   off(name, callback) {
      const callbacks = this._events[name];
      const isDelete = [];

      if (callbacks && callbacks.length) {
         if (callback) {
            callbacks.forEach((cb, index) => {
               if (cb === callback) {
                  isDelete.push(index);
               }
            });

            this._events[name] = callbacks.filter((cd, index) => {
               return isDelete.indexOf(index) === -1;
            });
         } else {
            delete this._events[name];
         }
      }

      return this;
   };

   /**
    * @param {String} name
    * @param {Arguments} [...args]
    */
   emit(name, ...args) {
      const callbacks = this._events[name];
      let callback;

      if (callbacks && callbacks.length) {
         callbacks.forEach(callback => {
            if (callback instanceof Function) {
               callback.apply(this, args);
            } else if (callback instanceof Array) {
               const callbacksRes = [];
               let cback;

               for (let index = 0; index < callback.length; index++) {
                  cback = callback[index];

                  if (cback instanceof Function) {
                     const callbackRes = cback.apply(this, args.concat(callbacksRes));

                     if (callbackRes instanceof Error) {
                        break;
                     } else if (callbackRes !== undefined) {
                        callbacksRes.push(callbackRes);
                     }
                  } else if (cback !== undefined) {
                     callbacksRes.push(cback);
                  }
               }
            }
         });
      }

      return this;
   };

   /**
    * @param {Function} callback
    */
   pipe(callback) {
      if (callback instanceof Function) {
         callback.call(this);
      }

      return this;
   }

}
