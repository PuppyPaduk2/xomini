import Notify from './Notify';
import { defProp } from './common';

export default class Element extends Notify {

   /**
    * @param {Object} [handlers]
    */
   constructor(handlers = {}) {
      super(handlers);

      let begin = false;
      let end = false;
      let name = '';3

      defProp(this, 'begin', {
         /**
          * @returns {Boolean}
          */
         get: () => {
            return begin;
         },
         /**
          * @param {Boolean} value
          */
         set: (value) => {
            value = !!value;

            if (value && !begin) {
               begin = value;
               this.emit('begin', this, ...getArgs.call(this, '_argsEmitBegin'));
            }
         }
      });

      defProp(this, 'end', {
         /**
          * @returns {Boolean}
          */
         get: () => {
            return end;
         },
         /**
          * @param {Boolean} value
          */
         set: (value) => {
            value = !!value;

            if (value && this.pending) {
               end = value;
               this.emit('end', this, ...getArgs.call(this, '_argsEmitEnd'));
            }
         }
      });

      defProp(this, 'pending', {
         /**
          * @returns {Boolean}
          */
         get: () => {
            return !!begin && !end;
         }
      });

      defProp(this, 'name', {
         /**
          * @returns {String}
          */
         get: () => {
            return name;
         },
         /**
          * @param {String} value
          */
         set: (value) => {
            if (!this.begin && typeof value === 'string') {
               name = value;
            }
         }
      })
   };

};


/**
 * @param {String} nameProp
 */
function getArgs(nameProp) {
   const func = this[nameProp];
   const args = func instanceof Function ? func : [];
   return args instanceof Array ? args : [];
};
