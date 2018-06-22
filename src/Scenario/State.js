import Notify from './Notify';

export default class State extends Notify {

   /**
    * @param {Object}
    */
   set values(values) {
      const change = {};

      if (values instanceof Object) {
         const keys = Object.keys(values);

         this.format.forEach(name => {
            if (this._values[name] !== values[name]
               && keys.indexOf(name) !== -1) {
               this._prev[name] = this._values[name];
               this._values[name] = values[name];
               change[name] = {
                  prev: this._prev[name],
                  value: this._values[name]
               };
            }
         });
      }

      this.change = change;

      this.emit('prev', this._prev);
      this.emit('values', this.values);
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
      this._change = values;
      this.emit('change', this.change);
   };

   /**
    * @returns {Object}
    */
   get change() {
      return this._change;
   };

   /**
    * @param {Object} values
    * @param {Object} handlers
    * @param {Object} handlersOnce
    */
   constructor(values, handlers, handlersOnce) {
      super(handlers, handlersOnce);

      this._prev = {};
      this._change = {};
      this._values = {};

      values = values instanceof Object ? values : {};

      this.format = Object.keys(values);
      this.values = values;
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };

}
