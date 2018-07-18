import Notify from './Notify';
import { defProps } from './common';

export default class State extends Notify {
   /**
    * @param {Object} defValues
    * @param {Object} [handlers]
    */
   constructor(defValues = {}, handlers = {}) {
      super(handlers);

      const format = Object.keys(defValues);

      let values = {};
      let prev = {};
      let change = {};

      defProps(this, {
         prev: {
            get: () => {
               return prev;
            }
         },
         change: {
            get: () => {
               return change;
            }
         },
         values: {
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
                     let prevValue = values[key];
                     let newValue = newValues[key];

                     if (prevValue !== newValue && format.indexOf(key) !== -1) {
                        prev[key] = prevValue;
                        change[key] = newValues[key];
                        values[key] = newValue;
                     }
                  });
               }
   
               if (Object.keys(change).length) {
                  this.emit('change', values, this);
               }
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
};
