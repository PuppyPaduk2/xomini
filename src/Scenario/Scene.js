import Notify from './Notify';
import State from './State';

function setValue() {
};

export default class Scene extends Notify {

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      value = !!value;

      if (value) {
         const then = () => { this.end = true; };

         this.setProp('begin', value);

         if (this.executor instanceof Function) {
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

      if (value) {
         this.state.end = this.state.current.clone();
         this.setProp('end', value);
      }
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

      if (state instanceof State) {
         this.state = {
            begin: state.clone(),
            current: state,
            end: null
         };
      }

      this.executor = executor;
   };

   run() {
      this.begin = true;
   };

}
