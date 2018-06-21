import State from './State';

export default class Scene extends State {

   /**
    * @param {Object} handlers
    * @param {Object} handlersOnce
    */
   constructor(handlers, handlersOnce) {
      const values = {
         begin: false,
         end: false
      };

      super(values, handlers, handlersOnce);
   };

   get begin() {
      return this.values.begin;
   };

   get end() {
      return this.values.end;
   };

   get pending() {
      return this.values.begin
         && !this.values.end;
   };

   next = () => {
      if (!this.begin) {
         this.values = { begin: true };
         this.emit('begin');
      } else if (!this.end) {
         this.values = { end: true };
         this.emit('end');
      }
   };

}
