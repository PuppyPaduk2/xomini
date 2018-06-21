import State from './State';

export default class Scenario extends State {

   /**
    * @param {Scene[]} scenes
    * @param {Number} sceneIndex
    */
   constructor(scenes, sceneIndex) {
      const values = {
         begin: false,
         end: false
      };

      super(values);

      this.scenes = scenes instanceof Array ? scenes : [];
   };

   /**
    * @param {Scene}
    */
   set scene(scene) {
      this._scene = scene;
      this._scene.once('end', this._sceneEnd);
   };

   /**
    * @param {Scene}
    */
   get scene() {
      return this._scene;
   };

   /**
    * @returns {Number}
    */
   get sceneIndex() {
      return this.scenes.indexOf(this.scene);
   };

   /**
    * @param {Scene}
    */
   get sceneNext() {
      return this.scenes[this.sceneIndex + 1];
   };

   next() {
      if (!this.scene) {
         this._sceneEnd();
         this.values = { begin: true };
         this.emit('begin');
      } else {
         this.scene.next();
      }

      return this;
   };

   _sceneEnd = () => {
      const sceneNext = this.sceneNext;

      if (sceneNext) {
         this.scene = sceneNext;
         this.scene.next();
      } else {
         this.values = { end: true };
         this.emit('end');
      }
   };

}
