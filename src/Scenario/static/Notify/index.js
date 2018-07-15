import { on, off, emit } from './common';

export default class Notify {

   /**
    * @param {Object} [options]
    * @param {Object} [options.on]
    * @param {Object} [options.once]
    */
   constructor(options = {}) {
      let _on = {};

      /**
       * @param {String|Object} nameEvent
       * @param {Function|Function[]} [callback]
       */
      this.on = (nameEvent, callback) => {
         on(_on, nameEvent, callback, {
            context: this
         });
         return this;
      };

      /**
       * @param {String|Object} nameEvent
       * @param {Function|Function[]} [callback]
       */
      this.once = (nameEvent, callback) => {
         on(_on, nameEvent, callback, {
            once: true
         });
         return this;
      };

      /**
       * @param {String|Object|Function|Function[]} nameEvent
       * @param {Function|Function[]} [callback]
       * @param {Object} context
       */
      this.off = (nameEvent, callback, context) => {
         if (nameEvent === undefined) {
            _on = {};
         } else {
            off(_on, nameEvent, callback, context);
         }
         return this;
      };

      /**
       * @param {String|Object} nameEvent
       * @param {Array} [...args]
       */
      this.emit = (nameEvent, ...args) => {
         return emit(_on, nameEvent, ...args);
      };

      this.handlers = () => {
         return Object.keys(_on);
      };

      this.countHandlers = () => {
         return this.handlers().reduce((result, ev) => {
            result[ev] = _on[ev].reduce((result, config) => {
               if (config.once) {
                  result.once++;
               } else {
                  result.on++;
               }

               return result;
            }, { on: 0, once: 0});

            return result;
         }, {});
      };

      this.on(options.on);
      this.once(options.once);
   };

};
