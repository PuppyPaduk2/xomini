import Notify from './Notify';

export default class State extends Notify {

   /**
    * @param {Object} [options]
    * @param {String} [options.nameValues]
    * @param {Object} [options.values]
    */
   constructor(options) {
      super(options);

      options = options instanceof Object ? options : {};

      this.nameValues = Object.keys(options.values || {});
      this._valuesPrev = {};
      this._values = options.values;
   };

   /**
    * @param {Object}
    */
   set values(values) {
      this.nameValues.forEach(name => {
         if (this._values[name] !== values[name]) {
            this._valuesPrev[name] = this._values[name];
            this._values[name] = values[name];
         }
      });
   };

   get values() {
      return this._values;
   };

}
