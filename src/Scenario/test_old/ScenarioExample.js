import State from '../State';
import Scenario from '../Scenario';
import log from './log';

import ScenarioTest from './Scenario';

let state;
let stateValues = {
   name: 'player 1',
   count: 0
};
let scenes;
let scenario;

describe('Scenario Example', () => {
   it('simple', () => {
      state = new State(stateValues);

      scenes = [
         (state, res) => {
            log('values@1', state.values);
            res();
         },
         [
            (values, res) => {
               log('values@2', values);
               // res();
            },
            (values) => {
               log('values@3', values);
            }
         ]
      ];

      scenario = new Scenario(state, scenes);

      scenario.on('scene', scene => {
         log('scene');

         let count = scene.state.values.count + 1;

         scene.state.values = {
            name: 'new name@' + count,
            count: count
         };

         count++;

         scene.state.values = {
            name: 'new name@' + count,
            count: count
         };
      });

      scenario.on({
         end: () => {
            log('end');
         }
      });

      scenario.run();
   });
});
