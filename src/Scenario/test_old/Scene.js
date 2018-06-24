import Scene from '../Scene';
import State from '../State';

let sWithout;
let sWithState;
let sWithExecutor;
let sWith;

describe('Scene', () => {
   describe('#new()', () => {
      describe('without params', () => {
         it('new', () => {
            sWithout = new Scene();
         });

         it('check props', () => {
            if (sWithout.state !== null) {
               throw new Error();
            }
         });
      });

      describe('with params:state', () => {
         it('new', () => {
            sWithState = new Scene(
               new State({ name: 'name' })
            );
         });

         it('check props', () => {
            if (!(sWithState.state instanceof State)) {
               throw new Error();
            }
         });
      });

      describe('with params:executor', () => {
         it('new', () => {
            sWithExecutor = new Scene(null, () => {
               console.log('executor');
            });
         });

         it('check props', () => {
            if (sWithExecutor.state instanceof State
               || !(sWithExecutor.executor instanceof Function)) {
               throw new Error();
            }
         });
      });

      describe('with params', () => {
         it('new', () => {
            const state = new State({ name: 'name' });
            sWith = new Scene(state, (state, res) => {
               console.log('executor', state.values);
               res();
            });
         });

         it('check props', () => {
            const state = sWith.state;

            if (!(sWithState.state instanceof State)
               || !(sWith.executor instanceof Function)) {
               throw new Error();
            }
         });
      });
   });

   describe('#run()', () => {
      const isBeginEnd = (scene) => {
         return scene.begin !== true && scene.end !== true;
      };

      describe('without params', () => {
         it('run', () => {
            sWithout.run();
         });

         it('check params', () => {
            if (isBeginEnd(sWithout)) {
               throw new Error();
            }
         });
      });

      describe('with params:state', () => {
         it('run', () => {
            sWithState.run();
         });

         it('check params', () => {
            if (isBeginEnd(sWithState)
               || !(sWithState.state instanceof State)) {
               throw new Error();
            }
         });
      });

      describe('with params:executor', () => {
         it('run', () => {
            sWithExecutor.run();
         });

         it('check params', () => {
            if (isBeginEnd(sWithState)
               || !(sWithState.state instanceof Object)) {
               throw new Error();
            }
         });
      });

      describe('with params', () => {
         it('run', () => {
            sWith.run();
         });

         it('check params', () => {
            if (isBeginEnd(sWithout)) {
               throw new Error();
            }
         });
      });
   });
});
