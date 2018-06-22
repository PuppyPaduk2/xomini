import Notify from './Notify';
import State from './State';

/**
 * @param {String} nameProp
 * @param {?} value
 * @param {Fuction} [callback]
 */
function setValue(nameProp, value, callback) {
   const pNameProp = '_' + nameProp;

   if (this[pNameProp] !== value) {
      this[pNameProp] = value;

      if (this.emit) {
         this.emit(nameProp);
      }

      if (callback instanceof Function) {
         callback.apply(this, arguments);
      }
   }
};

export default class Scene extends Notify {

   /**
    * @param {State} state
    * @param {Function} executor
    * @param {Object} options
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

   /**
    * @param {Boolean} value
    */
   set begin(value) {
      const then = () => { this.end = true; };

      setValue.call(this, 'begin', value);

      if (this.executor instanceof Function) {
         this.action = new Promise(this.executor.bind(this, this.state.current));
         this.action.then(then, then);
      } else {
         this.end = true;
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
      this.state.end = this.state.current.clone();
      setValue.call(this, 'end', value);
   };

   /**
    * @returns {Boolean}
    */
   get end() {
      return !!this._end;
   };

   run() {
      this.begin = true;
   };

}
