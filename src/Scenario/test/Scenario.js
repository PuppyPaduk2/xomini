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
let scene;

describe('Scenario', () => {
   it('simple', () => {
      scenario = new Scenario([
         {
            handlers: {
               begin: () => {
                  log('scene:1:begin');
               },
               end: () => {
                  log('scene:1:end');
               },
               change: (values, res, scene) => {
                  log(values);

                  if (values.point[0] < 5 && values.point[1] < 5) {
                     scene.values = {
                        point: [values.point[0] + 1, values.point[1] + 1]
                     };
                     res();
                  }
               }
            }
         }, {
            handlers: {
               begin: () => {
                  log('scene:2:begin');
               },
               end: () => {
                  log('scene:2:end');
               },
               change: (values, res, scene) => {
                  log(values);

                  if (values.point[0] < 5 && values.point[1] < 5) {
                     scene.values = {
                        point: [values.point[0] + 1, values.point[1] + 1]
                     };
                     res();
                  }
               }
            }
         }
      ], {
            state: new State(values1)
         });

      scenario.scenes[0].run();
      scenario.scenes[0].values = { name: 'new name' };
      scenario.scenes[0].values = { point: [0, 0] };
   });
});
