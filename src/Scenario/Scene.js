import Notify from './Notify';
import State from './State';

export default class Scene extends Notify {

   /**
    * @param {State} value
    */
   set state(value) {
      if (!this._state && value instanceof State && !this.begin) {
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
      if (!!value && !this.begin) {
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
      if (!!value && this.begin && !this.end) {
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
    * @param {Scene} value
    */
   set next(value) {
      if (!this.begin && value instanceof Scene) {
         this._next = value;
      }
   };

   /**
    * @returns {Scene}
    */
   get next() {
      return this._next || null;
   };

   /**
    * @param {Object} [options]
    * @param {Function} [options.executor]
    * @param {State} [options.state]
    * @param {Scene} [options.next]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(options) {
      options = options instanceof Object ? options : {};

      super(options.handlers, options.handlersOnce);

      this.state = options.state;
      this.executor = options.executor;
      this.next = options.next;
   };

   run() {
      if (!this.begin && !this.end) {
         if (this.executor && this.state) {
            const promise = new Promise((res, rej) => {
               this._subscribeToState(this.state, res, rej);

               this.executor.call(this, this.values, res, rej);

               this.begin = true;
            });

            promise.then(this._then.bind(this), this._then.bind(this));
         } else {
            this._subscribeToState(this.state);
            this.begin = true;
         }
      }

      return this;
   };

   stop() {
      this.end = true;
      return this;
   };

   _then() {
      this.state.off('change', this.__stateChange);
      this.__stateChange = undefined;
   };

   _resRej(callback) {
      this.end = true;

      if (callback instanceof Function) {
         callback();
      }

      if (this.next) {
         this.next.state = this.state;
         this.next.run();
      }
   };

   /**
    * @param {State} state
    * @param {Function} res
    * @param {Function} rej
    */
   _subscribeToState(state, res, rej) {
      if (state instanceof State) {
         res = this._resRej.bind(this, res);
         rej = this._resRej.bind(this, rej);

         this.__stateChange = this._stateChange.bind(this, res, rej);

         this._state.on({
            change: this.__stateChange
         });
      }
   };

   /**
    * @param {Object} values
    */
   _stateChange(...args) {
      this.emit('change', ...args.reverse());
   };

}
