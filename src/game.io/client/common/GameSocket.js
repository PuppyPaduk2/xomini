import Socket from './Socket';

export default class GameSocket extends Socket {

   /**
    * @param {String} name
    * @param {Object} [options]
    * @param {Object} [options.io]
    */
   constructor(name, options) {
      super(name, options);
   }

}
