import Element from '../Element';
import State from '../State';
import { defProp } from '../common';

export default class Scene extends Element {
   /**
    * @param {Object} [options]
    * @param {String} [options.name]
    * @param {State} [options.state]
    * @param {Function} [options.executor]
    * @param {Scene} [options.next]
    * @param {Object} [handlers]
    */
   constructor(options = {}, handlers = {}) {
      super(handlers);

      let state = null;
      let executor = null;
      let next = null;
      let stateHandlers;

      defProp(this, 'state', {
         /**
          * @returns {State}
          */
         get: () => {
            return state;
         },
         /**
          * @param {State} value
          */
         set: (value) => {
            if (value instanceof State && !this.begin) {
               state = value;
            }
         }
      });

      defProp(this, 'values', {
         /**
          * @returns {Object}
          */
         get: () => {
            if (this.state) {
               return this.state.values;
            } else {
               return {};
            }
         },
         /**
          * @param {Object} values
          */
         set: (values) => {
            if (values instanceof Object && state
               && this.begin && !this.end) {
               state.values = values;
            }
         }
      });

      defProp(this, 'executor', {
         /**
          * @param {Function}
          */
         set: (value) => {
            if (value instanceof Function && !this.begin) {
               executor = value;
            }
         }
      });

      defProp(this, 'next', {
         /**
          * @return {Scene}
          */
         get: () => {
            return next;
         },
         /**
          * @param {Scene} value
          */
         set: (value) => {
            if (!this.begin && value instanceof Scene) {
               next = value;
            }
         }
      });

      this.name = options.name;
      this.state = options.state;
      this.executor = options.executor;
      this.next = options.next;

      this.run = () => {
         if (!this.begin) {
            if (executor) {
               const result = new Promise((res) => {
                  stateHandlers = onState.call(this, res);
                  res = stop.bind(this, res);
                  this.begin = true;
                  executor.call(this, res, this);
               });

               result.then(() => {
                  this.emit('then', this.values, this);
               });
            } else {
               stateHandlers = onState.call(this);
               this.begin = true;
            }
         }

         return this;
      };

      this.stop = () => {
         if (this.state) {
            this.end = true;
            this.state.off(stateHandlers);
            stateHandlers = undefined;
         }

         return this;
      };
   };

   rerun() {
      this.stop().reset().run();
   };

};

/**
 * @param {Function} res
 */
function stop(res) {
   if (this.pending) {
      this.stop();

      if (res instanceof Function) {
         res();
      }

      if (this.next) {
         this.next.state = this.state;

         const resEmit = this.emit('next', this.next, this.state, this);

         if (!(resEmit instanceof Error)) {
            this.next.run();
         }
      }
   }
};


/**
 * @param {Function} res
 */
function onState(res) {
   let handlers = {};

   if (this.state) {
      res = stop.bind(this, res);

      handlers = {
         change: (values) => {
            if (this.pending) {
               const result = this.emit('change', values, res, this);

               if (result instanceof Error) {
                  res();
               } else if (result instanceof Object) {
                  this.values = result;
               }
            }
         }
      };

      this.state.on(handlers);
   }

   return handlers;
};

/**
 * @param {State} state
 * @param {Function|Function[]} change
 */
export function fastCreate(state, change) {
   return new Scene({
      state: state
   }, {
      on: {
         change: change
      }
   });
};
