import Notify from './Notify';
import State from './State';

export default class Scene extends Notify {

   /**
    * @param {State} value
    */
   set state(value) {
      if (!this._state && value instanceof State) {
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
    * @param {Object} values
    */
   set values(values) {
      if (values instanceof Object && this.state
         && this.begin && !this.end) {
         this.state.values = values;
      }
   };

   /**
    * @returns {Object}
    */
   get values() {
      if (this.state) {
         return this.state.values;
      } else {
         return {};
      }
   };

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      if (!!value) {
         this._begin = value;
         this.emit('begin', this.values);
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
      if (!!value && this.begin) {
         this._end = value;
         this.emit('end', this.values);
      }
   };

   /**
    * @returns {Boolean}
    */
   get end() {
      return !!this._end;
   };

   /**
    * @param {Function}
    */
   set executor(value) {
      if (value instanceof Function && !this.begin) {
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
      if (!this.begin && !this.end) {
         if (this.executor) {
            const promise = new Promise((...args) => {
               this.__stateChange = this._stateChange.bind(this, ...args);
               this._state.on({
                  change: this.__stateChange
               });

               this.executor.call(this, this.values, ...args);

               this.begin = true;
            });

            promise.then(this._then.bind(this), this._then.bind(this));
         } else {
            this.begin = true;
            this.end = true;
         }
      }
   };

   _then() {
      this.state.off('change', this.__stateChange);
      this.__stateChange = undefined;
      this.end = true;
   };

   /**
    * @param {Object} values
    */
   _stateChange(...args) {
      this.emit('change', ...args.reverse());
   };

}
