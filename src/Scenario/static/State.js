import Notify from './Notify';

export default class State extends Notify { 

   /**
    * @param {Object}
    */
   set values(values) {
      const prev = {};
      const change = {};

      if (values instanceof Object) {
         const keys = Object.keys(values);

         keys.forEach((key) => {
            if (this._values[key] !== values[key]
            && this.format.indexOf(key) !== -1) {
               prev[key] = this._values[key];
               change[key] = values[key];
               this._values[key] = values[key];
            }
         });
      }

      if (Object.keys(change).length) {
         this.change = change;
         this.prev = prev;

         this.emit('change', this.values);
      }
   };

   /**
    * @returns {Object}
    */
   get values() {
      return this._values;
   };

   /**
    * @param {Object} value
    */
   set change(values) {
      if (values instanceof Object) {
         this._change = values;
      }
   };

   /**
    * @returns {Object}
    */
   get change() {
      return this._change;
   };

   /**
    * @param {Object}
    */
   set prev(value) {
      if (value instanceof Object) {
         this._prev = value;
      }
   };

   /**
    * @returns {Object}
    */
   get prev() {
      return this._prev;
   };

   /**
    * @param {Object} values
    * @param {Object} [handlers]
    * @param {Object} [handlersOnce]
    */
   constructor(values, handlers, handlersOnce) {
      super(handlers, handlersOnce);

      values = values instanceof Object ? values : {};

      this._prev = {};
      this._change = {};
      this._values = {};

      const format = Object.keys(values);

      this.format = format;
      format.forEach((key) => {
         this._values[key] = values[key];
      });
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };

}
