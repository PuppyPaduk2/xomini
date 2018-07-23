import Notify from './Notify';
import { defProps } from '../common';

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
      let isInit = true;

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

                        if (prevValue instanceof State) {
                           this.off(prevValue);
                        }

                        if (newValue instanceof State) {
                           this.on({
                              change: () => {
                                 this.emit('change', this.values, this);
                              }
                           }, newValue);
                        }
                     }
                  });
               }

               if (Object.keys(change).length && !isInit) {
                  this.emit('change', this.values, this);
               }
            }
         }
      });

      this.values = defValues;
      isInit = false;

      this.collectValues = () => {
         return Object.keys(values).reduce((result, name) => {
            if (values[name] instanceof State) {
               result[name] = values[name].collectValues();
            } else {
               result[name] = values[name];
            }
            return result;
         }, {});
      };
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };
};
