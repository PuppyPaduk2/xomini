import Notify from './Notify';

function defProp(...args) {
   Object.defineProperty(...args);
};

export default class State extends Notify {

   /**
    * @param {Object} values
    * @param {Object} [handlers]
    */
   constructor(values = {}, handlers = {}) {
      super(handlers);

      let prev = {};
      let change = {};
      const format = Object.keys(values);

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
   };

   /**
    * @returns {State}
    */
   clone() {
      return new State(this.values);
   };

}
