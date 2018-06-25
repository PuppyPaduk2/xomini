import Notify from './Notify';
import State from './State';

function setValue() {
};

export default class Scene extends Notify {

   /**
    * @param {State} value
    */
   set state(value) {
      if (value instanceof State) {
         this._state = value;
      }
   };

   /**
    * @returns {State}
    */
   get state() {
      return this._state || null;
   };

   /**
    * @param {Function} value
    */
   set executor(value) {
      if (value instanceof Function) {
         this._executor = value;
      }
   };

   /**
    * @returns {Function}
    */
   get executor() {
      return this._executor;
   };

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      value = !!value;

      if (value && !this._begin) {
         this.setProp('begin', value);

         if (this.state) {
            const then = () => { this.end = true; };

            this.action = new Promise((res, rej) => {
               const resolve = this._resolve.bind(this, res);
               const reject = this._reject.bind(this, rej);

               this.__stateOnValues = this._stateOnValues.bind(this, this.state, reject, resolve);
               this.state.on('values', this.__stateOnValues);

               if (this.executor) {
                  this.executor.call(this, this.state, resolve, reject);
               }
            });

            this.action.then(then, then);
         } else {
            this.end = true;
         }
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
      value = !!value;

      if (value && this.state) {
         this.state.off('values', this.__stateOnValues);
         this.__stateOnValues = undefined;
         this.state = this.state.clone();
      }

      this.setProp('end', value);
   };

   /**
    * @returns {Boolean}
    */
   get end() {
      return !!this._end;
   };

   /**
    * @param {State} state
    * @param {Function} executor
    * @param {Object} [options]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(state, executor, options) {
      options = options instanceof Object ? options : {};

      super(options.handlers, options.handlersOnce);

      this.state = state;
      this.executor = executor;
   };

   run() {
      this.begin = true;
   };

   _resolve = (resolve) => {
      this.emit('resolve');
      resolve();
      return new Error('resolve');
   };

   _reject = (reject) => {
      this.emit('reject');
      reject();
      return new Error('reject');
   };

   _stateOnValues = (...args) => {
      args = args.reverse();
      this.emit('values', ...args);
   };

}
