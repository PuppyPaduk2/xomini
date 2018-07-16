import Notify from './Notify';
import { defProp } from './common';

export default class State extends Notify {

   /**
    * @param {Object} defValues
    * @param {Object} [handlers]
    */
   constructor(defValues = {}, handlers = {}) {
      super(handlers);

      let values = {};
      let prev = {};
      let change = {};
      const format = Object.keys(defValues);

      defProp(this, 'prev', {
         get: () => {
            return prev;
         }
      });

      defProp(this, 'change', {
         get: () => {
            return change;
         }
      });

      defProp(this, 'values', {
         get: () => {
            return values;
         },
         /**
          * @param {Object}
          */
         set: (newValues) => {
            if (newValues instanceof Object) {
               prev = {};
               change = {};

               Object.keys(newValues).forEach((key) => {
                  if (values[key] !== newValues[key] && format.indexOf(key) !== -1) {
                     prev[key] = values[key];
                     change[key] = newValues[key];
                     values[key] = newValues[key];
                  }
               });
            }

            if (Object.keys(change).length) {
               this.emit('change', values, this);
            }
         }
      });

      this.values = defValues;
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };

}
