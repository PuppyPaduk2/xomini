import Scenario from '../Scenario';
import log from '../common';
import State from '../State';
import Scene from '../Scene';

let scenario;
let values1 = {
   name: 'User name',
   point: [50, 99],
   count: 0
};
var values2 = {
   name: 'new name user',
   point: [0, 0],
   count: 1
};

describe('Scenario', () => {
   it('simple', () => {
      scenario = new Scenario({
         state: new State(values1),
         scenes: [
            {
               name: 'scene#1',
               handlers: {
                  change: (values, res, scene) => {
                     log(scene.name, values);
                     res();
                  }
               }
            }, {
               name: 'scene#2',
               handlers: {
                  change: (values, res, scene) => {
                     log(scene.name, values);

                     if (values.name === '321') {
                        res();
                     }
                  }
               },
               handlersOnce: {
                  next: (next, state, scene) => {
                     log(scene.name, 'next');
                  }
               }
            }, {
               name: 'scene#3',
               executor: (values, res, scene) => {
                  log(scene.name, 'executor');
                  res();
                  scene.values = { name: 'after res()' };
               },
               handlers: {
                  change: (values, res, scene) => {
                     log(scene.name, values);
                     res();
                  },
                  then: (values, scene) => {
                     log('then', values, scene.end);
                  }
               }
            }, {
               name: 'scene#4',
               handlers: {
                  change: (values, res, scene) => {
                     log(scene.name, values);

                     if (values.name === 'Player#2') {
                        res();
                     }
                  }
               }
            }
         ],
         handlersOnce: {
            end: () => {
               log('scenario end');
            }
         },
         handlers: {
            'state:change': (values, state) => {
               log('state:change', state.prev);
            }
         }
      });

      scenario.run();

      scenario.state.values = values2;
      scenario.state.values = { name: '123' };
      scenario.state.values = { name: 'asd' };
      scenario.state.values = { name: '321' };
      scenario.state.values = { name: 'Player#1', point: [1, 1] };
      scenario.state.values = { name: 'Player#2', count: 2 };

      scenario.state.values = { name: 'Player#3' };
      scenario.state.values = { name: 'Player#4' };

   });
});
