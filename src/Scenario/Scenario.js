import Notify from './Notify';
import State from './State';
import Scene from './Scene';

/**
 * @
 */
function setOneScene(scene) {

};

export default class Scenario extends Notify {

   /**
    * @param {State} value
    */
   set state(value) {
      if (value instanceof State) {
         this._state = value;
      }
   };

   /**
    * @returns {State}
    */
   get state() {
      return this._state;
   };

   /**
    * @param {Function[]} value
    */
   set scenes(value) {
      this._scenes = value instanceof Array ? value : [];
   };

   /**
    * @returns {Function[]}
    */
   get scenes() {
      return this._scenes;
   };

   /**
    * @param {Function|Function[]|Function[][]} scene
    */
   set scene(value) {
      const isFunc = value instanceof Function;
      const isArr = value instanceof Array;

      if (isFunc || isArr) {
         if (isFunc) {
            this._scene = new Scene(this.state, value);
         } else {
            this._scene = new Scene(this.state);

            value.forEach(handlers => {
               this._scene.on('values', handlers);
            });
         }

         this.__scene = value;

         this._scene.run();
         this._scene.once('end', () => {
            const nextScene = this.nextScene;

            if (nextScene) {
               this.scene = nextScene;
            } else {
               this.end = true;
            }
         });

         this.emit('scene', this._scene);
      }
   };

   /**
    * @return {Scene}
    */
   get scene() {
      return this._scene;
   };

   /**
    * @param {Scene}
    */
   get nextScene() {
      const scenes = this.scenes;
      const index = this.scenes.indexOf(this.__scene);
      return scenes[index + 1];
   };

   /**
    * @param {Boolean}
    */
   set begin(value) {
      value = !!value;

      if (value) {
         this.setProp('begin', value);

         if (this.scenes.length) {
            this.scene = this.scenes[0];
         } else {
            this.end = true;
         }
      }
   };

   get begin() {
      return !!this._begin;
   };

   /**
    * @param {Boolean}
    */
   set end(value) {
      value = !!value;

      if (value) {
         this.setProp('end', value);
      }
   };

   get end() {
      return !!this._end;
   };

   /**
    * @param {State} state
    * @param {Function[]} scenes
    * @param {Object} [options]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(state, scenes, options) {
      options = options instanceof Object ? options : {};

      super(options.handlers, options.handlersOnce);

      this.state = state;
      this.scenes = scenes;
   };

   run() {
      this.begin = true;
      return this;
   };

}
