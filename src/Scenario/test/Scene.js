import Scene from '../Scene';
import State from '../State';
import log from '../log';

let scene;
let values1 = { name: 'player' };
let values2 = { name: 'User name', count: 1 };

describe('Scene', () => {
   it('simple example', () => {
      scene = new Scene(new State(values1));

      scene.values = values2;

      if (scene.values.name !== 'player') {
         throw new Error();
      }
   });

   it('#run()', () => {
      scene = new Scene(new State(values1));

      scene.begin = true;
      scene.begin = false;
      scene.end = true;
      scene.end = false;

      if (scene.begin === false || scene.end === false) {
         throw new Error();
      }
   });

   it('change values after #run()', () => {
      scene = new Scene(new State(values1));

      scene.run();

      scene.values = values2;

      if (scene.values.name !== 'player') {
         throw new Error();
      }
   });

   it('set executor and subscribe on events', () => {
      scene = new Scene(new State(values1), (values, res) => {
         log('executor', values);
      });

      scene.on({
         begin: function() {
            this.values = { name: 'begin' };
         },
         change: function(values, res) {
            log('change', values);

            if (values.name !== 'begin @1') {
               this.values = { name: 'begin @1' };
               res();
            }
         },
         end: function() {
            log('end#1', this.values);
            this.values = { name: 'end' };
            log('end#2', this.values);
         }
      });

      scene.run();
      scene.run();

      if (!(scene.executor instanceof Function)) {
         throw new Error();
      }
   });
});
