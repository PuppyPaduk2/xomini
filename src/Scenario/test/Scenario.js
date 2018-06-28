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
                     res();
                  }
               }
            }
         ]
      });

      scenario.run();

      scenario.scene.values = values2;
      scenario.scene.values = { name: '123' };
      scenario.scene.values = { name: 'asd' };
      scenario.scene.values = { name: '321' };
      scenario.scene.values = { name: 'Player#1' };

   });
});
