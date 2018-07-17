import Element from './Element';
import { fastCreate } from './Scene';
import State from './State';
import { defProps } from './common';

export default class Layer extends Element {
   /**
    * @param {Object} [options]
    * @param {Object} [options.state]
    * @param {Function[]} [options.elements]
    * @param {Object} [handlers]
    */
   constructor(options = {}, handlers = {}) {
      super(handlers);

      let elements = [];
      let state = null;
      let elementsRun = 0;

      defProps(this, {
         state: {
            /**
             * @param {Object} value
             */
            set: (value) => {
               if (value instanceof Object && !this.begin) {
                  state = new State(value);

                  elements.forEach(element => element.state = state);
               }
            }
         },
         elements: {
            /**
             * @param {Object[]} values
             */
            set: (values) => {
               if (values instanceof Array && !this.begin) {
                  elements = values.filter(value => value instanceof Function || value instanceof Array)
                     .map(value => fastCreate(state, value));

                  if (!options.parallel) {
                     elements.forEach((element, index) => {
                        let next = elements[index + 1];

                        if (next) {
                           element.next = next;
                        } else {
                           element.on({
                              end: (el) => {
                                 console.log('@@end', state.values)
                              }
                           })
                        }
                     });
                  }
               }
            }
         },
         values: {
            /**
             * @returns {Object}
             */
            get: () => {
               return state ? state.values : {};
            },
            /**
             * @param {Object} values
             */
            set: (values) => {
               if (values instanceof Object && this.pending && state) {
                  console.log(elements[0].end, elements[1].begin);
                  state.values = values;
               }
            }
         }
      });

      this.state = options.state;
      this.elements = options.elements;

      this.run = () => {
         this.begin = true;

         if (!!options.parallel) {
            elementsRun = elements.length;

            elements.forEach(scene => scene.run().once({
               end: () => {
                  elementsRun--;

                  if (elementsRun === 0) {
                     this.stop();
                  }
               }
            }));
         } else {
            elements[0].run();
         }
      };

      this.stop = () => {
         if (elementsRun !== 0) {
            elements.forEach(scene => scene.stop());
         }

         this.end = true;
      };
   };
};
