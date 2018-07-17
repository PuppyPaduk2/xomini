import Element from './Element';
import { fastCreate } from './Scene';
import State from './State';
import { defProps } from './common';

export default class Layer extends Element {
   /**
    * @param {Object} [options]
    * @param {Object} [options.state]
    * @param {Function[]} [options.scenes]
    * @param {Object} [handlers]
    */
   constructor(options = {}, handlers = {}) {
      super(handlers);

      let scenes = [];
      let state = null;
      let scenesRun = 0;

      defProps(this, {
         state: {
            /**
             * @param {Object} value
             */
            set: (value) => {
               if (value instanceof Object && !this.begin) {
                  state = new State(value);

                  scenes.forEach(scene => scene.state = state);
               }
            }
         },
         scenes: {
            /**
             * @param {Object[]} values
             */
            set: (values) => {
               if (values instanceof Array && !this.begin) {
                  scenes = values.filter(value => value instanceof Function || value instanceof Array)
                     .map(value => fastCreate(state, value));
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
                  state.values = values;
               }
            }
         }
      });

      this.state = options.state;
      this.scenes = options.scenes;

      this.run = () => {
         this.begin = true;

         scenesRun = scenes.length;

         scenes.forEach(scene => scene.run().once({
            end: () => {
               scenesRun--;

               if (scenesRun === 0) {
                  this.stop();
               }
            }
         }));
      };

      this.stop = () => {
         if (scenesRun !== 0) {
            scenes.forEach(scene => scene.stop());
         }

         this.end = true;
      };
   };
};
