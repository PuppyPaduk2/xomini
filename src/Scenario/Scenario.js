import Notify from './Notify';
import State from './State';
import Scene from './Scene';

export default class Scenario extends Notify {

   /**
    * @param {Object[]} scenes
    */
   set scenes(scenes) {
      if (scenes instanceof Array) {
         this._scenes = scenes.map((scene, index) => {
            if (scene instanceof Object) {
               scene = new Scene(scene);

               if (this.state) {
                  scene.state = this.state;
               }

               return scene;
            }
         }).filter(scene => scene !== undefined);
      }
   };

   /**
    * @return {Scene[]}
    */
   get scenes() {
      return this._scenes || [];
   };

   /**
    * @param {State} value
    */
   set state(value) {
      if (value instanceof State) {
         this._state = value;
      }
   };

   /**
    * @return {State}
    */
   get state() {
      return this._state || null;
   };

   /**
    * @param {Scene} value
    */
   set scene(value) {
      if (value instanceof Scene) {
         this._scene = value;
      }
   };

   /**
    * @returns {Scene}
    */
   get scene() {
      return this._scene || null;
   };

   /**
    * @param {Object[]} scenes
    * @param {Object} [options]
    * @param {State} [options.state]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(scenes, options) {
      options = options instanceof Object ? options : {};

      super(options.handlers, options.handlersOnce);

      this.state = options.state;
      this.scenes = scenes;
   };

}
