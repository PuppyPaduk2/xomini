import Scene from '../Scene';
import State from '../State';
import log, { err } from '../common';

let scene;
let values1 = { name: 'player' };
let values2 = { name: 'User name', count: 1 };

describe('Scene', () => {
   it('simple example', () => {
      scene = new Scene({
         state: new State(values1)
      });

      scene.values = values2;

      if (scene.values.name !== 'player') {
         err();
      }
   });

   it('#run()', () => {
      scene = new Scene();

      scene.begin = true;
      scene.begin = false;
      scene.end = true;
      scene.end = false;

      if (scene.begin === false || scene.end === false) {
         err();
      }
   });

   it('change values after #run()', () => {
      scene = new Scene({
         state: new State(values1)
      });

      scene.run().stop();

      scene.values = values2;

      if (scene.values.name !== 'player') {
         err();
      }
   });

   it('set executor and subscribe on events', () => {
      scene = new Scene({
         state: new State(values1),
         executor: (values, res) => {
            log('executor', values);
         }
      });

      scene.on({
         begin: function() {
            this.values = { name: 'begin' };
         },
         change: function(values, res) {
            log('change', values);

            if (values.name === 'begin @3') {
               this.values = { name: 'begin @END' };
               res();
            }
         },
         end: function() {
            this.values = { name: 'end' };
            log('end >>>', this.values);
         }
      });

      scene.run();

      scene.values = { name: 'begin @2' };
      scene.values = { name: 'begin @3' };

      scene.run();

      scene.values = { name: 'begin @2' };

      if (!(scene.executor instanceof Function)) {
         err();
      }

      if (scene.values.name !== 'begin @END') {
         err();
      }
   });

   it('next scene', () => {
      const sceneZero = new Scene({
         state: new State(values2),
         handlers: {
            change: (values, res) => {
               log('sceneZero:change', values);
               res();
            }
         }
      });

      scene = new Scene({
         state: new State(values1),
         next: sceneZero
      });

      scene.on('change', (values, res) => {
         log('scene:change', values);
         res();
      });

      scene.run();

      scene.values = { name: 'pl' };
      scene.values = { name: 'name' };
      scene.values = { name: 123 };

      log('sceneZero', sceneZero.values);

      sceneZero.values = { name: 'pl' };
      sceneZero.values = { name: 'name' };
      sceneZero.values = { name: 123 };

      log('sceneZero', sceneZero.values);

   });
});
