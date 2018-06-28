import Notify from './Notify';

export default class BeginEnd extends Notify {

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      if (!!value && !this.begin) {
         this._begin = value;
         this.emit('begin', this);
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
      if (!!value && this.begin && !this.end) {
         this._end = value;
         this.emit('end', this);
      }
   };

   /**
    * @returns {Boolean}
    */
   get end() {
      return !!this._end;
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
   }

}
