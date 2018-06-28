import BeginEnd from './BeginEnd';
import State from './State';

export default class Scene extends BeginEnd {

   /**
    * @param {State} value
    */
   set state(value) {
      if (value instanceof State && !this.begin) {
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

      this.name = options.name;
      this.state = options.state;
      this.executor = options.executor;
      this.next = options.next;
   };

   run() {
      if (!this.begin && !this.end) {
         if (this.executor && this.state) {
            const promise = new Promise((res) => {
               res = this._resRej.bind(this, res);
               this._onState(res);
               this.begin = true;
               this.executor.call(this, this.values, res, this);
            });

            promise.then(this._then.bind(this));
         } else {
            this._onState();
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
      this.emit('then', this.values, this);
   };

   _resRej(callback) {
      this.stop();

      this._offState();

      if (callback instanceof Function) {
         callback();
      }

      if (this.next) {
         this.next.state = this.state;
         this.next.run();
      }
   };

   /**
    * @param {Function} res
    */
   _onState(res) {
      if (this.state) {
         res = this._resRej.bind(this, res);

         this.__stateChange = this._stateChange.bind(this, res);

         this.state.on({
            change: this.__stateChange
         });
      }
   };

   /**
    * @param {State} state
    */
   _offState() {
      if (this.state) {
         this.state.off('change', this.__stateChange);
         this.__stateChange = undefined;
      }
   };

   /**
    * @param {Object} values
    */
   _stateChange(res, values) {
      this.emit('change', values, res, this);
   };

}
