import Notify from './Notify';
import State from './State';

export default class Action extends Notify {

   /**
    * @param {State} state
    * @param {Function} executor
    */
   constructor(state, executor) {
      super();

      if (state instanceof State && executor instanceof Function) {
         this.state = state;

         this.promise = new Promise((resolve, reject) => {
            executor.call(this, state.values, this._resolve.bind(this, resolve), this._reject.bind(this, reject));
         });
      }
   };

   _resolve = (resolve, state) => {
      console.log(state, '_resolve');
   };

   _reject = (reject, state) => {
      console.log(this, '_reject');
   };


}
