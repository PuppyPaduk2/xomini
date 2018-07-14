import Element from './Element';
import State from './State';
import Scene from './Scene';

export default class Scenario extends Element {

   /**
    * @param {Object[]} scenes
    */
   set scenes(scenes) {
      if (scenes instanceof Array) {
         this._scenes = scenes.map((scene, index) => {
            if (scene instanceof Object) {
               scene = new Scene(scene);

               scene.once({
                  begin: this._sceneBegin.bind(this),
                  end: this._sceneEnd.bind(this),
                  next: this._sceneNext.bind(this)
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
    * @param {String} [options.name]
    * @param {Object[]} [options.scenes]
    * @param {State} [options.state]
    * @param {Object} [options.handlers]
    * @param {Object} [options.handlersOnce]
    */
   constructor(options = {}) {
      super(options.handlers, options.handlersOnce);

      this.name = options.name;
      this.state = options.state;
      this.scenes = options.scenes;
   };

   run() {
      this.begin = true;
      if (this.state) {
         this.__stateChange = this._stateChange.bind(this);
         this.state.on('change', this.__stateChange);
      }
      this.scenes[0].run();
      return this;
   };

   stop() {
      if (this.state) {
         this.state.off('change', this.__stateChange);
         this.__stateChange = undefined;
      }
      this.end = true;
      return this;
   };

   /**
    * @param {Scene} scene
    * @param {*} args
    */
   _sceneBegin(scene, ...args) {
      this.scene = scene;
      this.emit('scene:begin', scene, ...args, this);
   };

   _sceneEnd(scene, next) {
      if (!next) {
         this.stop();
      }

      this.emit('scene:end', scene, next, this);
   };

   _sceneNext(...args) {
      this.emit('scene:next', ...args, this);
   };

   _stateChange(...args) {
      this.emit('state:change', ...args);
   };

}
