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
         this._state = {
            begin: value.clone(),
            current: value,
            end: null
         };
      }
   };

   get state() {
      return this._state || null;
   };

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      value = !!value;

      if (value && !this._begin) {
         this.setProp('begin', value);

         if (this.state && this.executor instanceof Function) {
            const then = () => { this.end = true; };
            this.action = new Promise(this.executor.bind(this, this.state.current));
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
         this.state.end = this.state.current.clone();
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

}
