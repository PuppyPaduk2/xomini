import Scene from '../Scene';
import State from '../State';
import chai from 'chai';

const assert = chai.assert;

let scene;
let values1 = { name: 'User name', count: 1 };
let values2 = { name: 'player' };
let values3 = { count: 2 };

function incCount(scene) {
   scene.values = { count: scene.values.count + 1 };
};

describe('Scene', () => {
   it('#new()', () => {
      let firstRun = true;
      scene = new Scene({
         name: '@scene',
         state: new State(values1),
         executor: (res, scene) => {
            if (firstRun) {
               incCount(scene);
               firstRun = false;
            }
         }
      });
   });

   it('#run() + executor', () => {
      scene.once('begin', () => {
         incCount(scene);
      });
      scene.run().run();
      assert.equal(scene.values.count, 3);
   });

   it('change values', () => {
      scene.once('change', (values, res, scene) => {
         return { count: values.count + 1 };
      });

      scene.values = { count: 1000 };
      scene.values = { count: scene.values.count + 1 };
      incCount(scene);

      assert.equal(scene.values.count, 1003);
   });

   it('#stop()', () => {
      let isEnd = false;

      scene.once('change', (values) => {
         return { count: 777 };
      }).once('end', () => {
         isEnd = true;
      });

      scene.values = { name: '@user' };
      scene.stop();
      scene.values = { name: '@userNewName' };

      assert.equal(scene.values.name, '@user');
      assert.equal(scene.values.count, 777);
      assert.equal(isEnd, true);
   });

   it('#rerun()', () => {
      let isBegin = false;
      let isEnd = false;

      scene.on({
         begin: () => {
            isBegin = true;
         },
         change: [
            (values) => {
               if (values.name === '@johny') {
                  return { name: '@mary', count: 33 };
               }
            },
            (values, res, scene) => {
               if (values.name === '@user') {
                  return { name: '@johny', count: 1 };
               }
            },
            (values) => {
               if (values.count === 999) {
                  return { name: '@newUser', count: 0 };
               }
            }
         ],
         end: () => {
            isEnd = true;
         }
      });

      assert.equal(scene.begin, true);
      assert.equal(scene.end, true);

      scene.rerun();

      assert.equal(isBegin, true);
      assert.equal(scene.end, false);

      scene.values = { name: '@user', count: 99 };

      assert.equal(scene.values.name, '@mary');
      assert.equal(scene.values.count, 33);

      scene.values = { count: 999 };

      assert.equal(scene.values.name, '@newUser');
      assert.equal(scene.values.count, 0);
   });
});
