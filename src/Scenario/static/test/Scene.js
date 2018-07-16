import Scene from '../Scene';
import State from '../State';
import chai from 'chai';

const assert = chai.assert;

let scene;
let values1 = { name: 'User name', count: 1 };
let values2 = { name: 'player' };
let values3 = { count: 2 };

describe('Scene', () => {
   it('#new()', () => {
      scene = new Scene({
         name: '@scene',
         state: new State(values1),
         executor: (res, scene) => {
            console.log('@executor');
            scene.values = values2;
         }
      }, {
         on: {
            change: (values, res) => {
               console.log('@change', values);
            }
         },
         once: {
            begin: () => {
               console.log('@begin');
            },
            end: () => {
               console.log('@end');
            }
         }
      });

      scene.run();
      scene.values = values3;
      scene.stop();
   });
});
