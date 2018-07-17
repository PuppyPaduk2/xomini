import Notify from './Notify';
import { defProps } from './common';

export default class Element extends Notify {

   /**
    * @param {Object} [handlers]
    */
   constructor(handlers = {}) {
      super(handlers);

      let begin = false;
      let end = false;
      let name = '';
      let next = null;

      defProps(this, {
         begin: {
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
                  this.emit('begin', this);
               }
            }
         },
         end: {
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
                  this.emit('end', this);

                  if (next) {
                     const resultEmit = this.emit('next', next, this);

                     if (!(resultEmit instanceof Error)) {
                        next.run();
                     }
                  }
               }
            }
         },
         pending: {
            /**
             * @returns {Boolean}
             */
            get: () => {
               return !!begin && !end;
            }
         },
         name: {
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
         },
         next: {
            /**
             * @return {Element}
             */
            get: () => {
               return next;
            },
            /**
             * @param {Element} value
             */
            set: (value) => {
               if (!this.begin && value instanceof Element) {
                  next = value;
               }
            }
         }
      });

      this.reset = () => {
         if (this.end) {
            begin = false;
            end = false;
         }

         return this;
      };
   };

};
