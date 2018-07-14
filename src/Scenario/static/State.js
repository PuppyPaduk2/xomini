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

         this.emit('change', this.values, this);
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
      return Object.keys(this._prev).length
         ? this.format.reduce((result, key) => {
            const prev = this._prev[key];

            if (prev !== undefined) {
               result[key] = prev;
            } else {
               result[key] = this.values[key];
            }

            return result;
         }, {})
         : this._prev;
   };

   /**
    * @param {Object} values
    */
   set format(values) {
      if (values instanceof Object && this.format === null) {
         this._format = Object.keys(values);
      }
   };

   /**
    * @returns {Array|null}
    */
   get format() {
      return this._format || null;
   };

   /**
    * @param {Object} values
    * @param {Object} [options]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(values = {}, options = {}) {
      super(options.handlers, options.handlersOnce);

      this._values = {};
      this._prev = {};
      this._change = {};

      this.format = values;

      this.format.forEach((key) => {
         this._values[key] = values[key];
      });
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };

   /**
    * @param {String} name
    */
   getValue(name) {
      if (this.format.indexOf(name) !== -1) {
         return this.values[name] || null;
      }
   };

   /**
    * @param {?|String} name
    * @param {?} value
    */
   setValue(name, value) {
      var values = {};

      if (typeof name === 'string') {
         values[name] = value;
      } else if (name instanceof Object) {
         values = name;
      }

      this.values = values;
   };

}
