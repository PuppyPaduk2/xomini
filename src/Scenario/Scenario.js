import BeginEnd from './BeginEnd';
import State from './State';
import Scene from './Scene';

export default class Scenario extends BeginEnd {

   /**
    * @param {Object[]} scenes
    */
   set scenes(scenes) {
      if (scenes instanceof Array) {
         this._scenes = scenes.map((scene, index) => {
            if (scene instanceof Object) {
               scene = new Scene(scene);

               scene.once({
                  begin: this._sceneBegin.bind(this)
               });

               if (this.state && !index) {
                  scene.state = this.state;
               }

               return scene;
            }
         }).filter(scene => scene !== undefined)

         this._scenes.forEach((scene, index) => {
            const sceneNext = this._scenes[index + 1];

            if (sceneNext) {
               scene.next = sceneNext;
            }
         });
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
    * @param {Object} [options]
    * @param {Object[]} [options.scenes]
    * @param {State} [options.state]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(options) {
      options = options instanceof Object ? options : {};

      super(options.handlers, options.handlersOnce);

      this.state = options.state;
      this.scenes = options.scenes;
   };

   run() {
      this.begin = true;
      this.scenes[0].run();
   };

   _sceneBegin(scene) {
      this.scene = scene;
   };

}
