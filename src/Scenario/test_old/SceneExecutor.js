import Scene from '../Scene';
import State from '../State';
import log from './log';

import SceneTest from './Scene';

let state;
let stateValues = {
   name: 'player 1',
   count: 1
};
let scene;

describe('Scene Executor', () => {
   describe('Simple example'.green, () => {
      it('new', () => {
         state = new State(stateValues);

         scene = new Scene(state, () => {
            log('executor');
         }, {
               handlers: {
                  begin: () => {
                     log('begin');
                  },

                  values: [
                     (values, res) => {
                        log('values', values);

                        if (values.count === 2) {
                           res();
                        }
                     },

                     function(values, res) {
                        log('values', values);

                        if (values.count === 2) {
                           return Error();
                        }
                     },

                     function(values, res) {
                        log('values', values);
                     }
                  ],

                  end: () => {
                     log('end');
                  }
               }
            });
      });

      it('run', () => {
         scene.run();
      });

      it('set values in state', () => {
         state.values = { name: 'it is change name', count: 2 };
      });

      it('set values in state', () => {
         state.values = { name: 'it is change name', count: 3 };
      });
   });

   describe('Setup handlers values'.cyan, () => {
      it('new', () => {
         state = new State(stateValues);
         scene = new Scene(state, () => {log('ex')});
      });

      it('on', () => {
         scene.once('values', (values, res) => {
            log('on values', values);
         });
      });


      it('on set', () => {
         scene.once('values', [
            (values, res) => {
               log('on set values @1', values);
               return res();
            },
            function(values, res) {
               log('on set values @2', values);
            },
            (values) => {
               log('on set values @3', values);
            }
         ]);

         scene.on('end', function() {
            log('end', this.state.values);
         });
      });

      it('run', () => {
         scene.run();
      });

      it('set values', () => {
         state.values = { name: 'name@new 1' };
         state.values = { name: 'name@new 2', count: 2 };
         state.values = { name: 'name@new 3', count: state.values.count - 100 };
         state.values = { name: 'name@new 4' };
         state.values = { name: 'name@new 5', count: state.values.count - 100 };
      });

      it('set values', () => {
         state.values = { name: 'name@new 6' };
         state.values = { name: 'name@new 7', count: state.values.count - 100 };
      });
   });
});
