import Notify from './Notify';

export default class Element extends Notify {

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      if (!!value && !this.begin) {
         this._begin = value;
         this.emit('begin', this, ...this._argsEmitBegin());
      }
   };

   /**
    * @returns {Boolean}
    */
   get begin() {
      return !!this._begin;
   };

   /**
    * @param {Boolean} value
    */
   set end(value) {
      if (!!value && this.pending) {
         this._end = value;
         this.emit('end', this, ...this._argsEmitEnd());
      }
   };

   /**
    * @returns {Boolean}
    */
   get end() {
      return !!this._end;
   };

   /**
    * @returns {Boolean}
    */
   get pending() {
      return !!this.begin && !this.end;
   };

   /**
    * @param {String} value
    */
   set name(value) {
      if (!this.begin && typeof value === 'string') {
         this._name = value;
      }
   };

   /**
    * @return {String}
    */
   get name() {
      return this._name || '';
   };

   /**
    * @returns {Array}
    */
   _argsEmitBegin() {
      return [];
   };

   /**
    * @returns {Array}
    */
   _argsEmitEnd() {
      return [];
   };

}
