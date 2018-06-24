import Scenario from '../Scenario';
import State from '../State';

let without;
let wState;
let wScenes;
let wParams;
let state = { name: 'name' };
let scenes = [
   (state, res) => {
      state.values = { name: state.values + ' $1' };
      res();
   },
   (state, res) => {
      state.values = { name: state.values + ' $2' };
      res();
   },
   (state, res) => {
      state.values = { name: state.values + ' $3' };
      res();
   }
]

describe('Scenario', () => {
   describe('#new()', () => {
      describe('without', () => {
         it('new', () => {
            without = new Scenario();
         });

         it('check props', () => {
            if (without.state !== undefined
               || without.scenes.length !== 0) {
               throw new Error();
            }
         });
      });

      describe('with params:state', () => {
         it('new', () => {
            wState = new Scenario(new State(state));
         });

         it('check props', () => {
            if (!(wState.state instanceof State)
               || wState.scenes.length !== 0) {
               throw new Error();
            }
         });
      });

      describe('with params:scenes', () => {
         it('new', () => {
            wScenes = new Scenario(null, scenes);
         });

         it('check props', () => {
            if (wScenes.state !== undefined
               || wScenes.scenes.length !== 3) {
               throw new Error();
            }
         });
      });

      describe('with params', () => {
         it('new', () => {
            wParams = new Scenario(new State(state), scenes);
         });

         it('check props', () => {
            if (!(wParams.state instanceof State)
               || wParams.scenes.length !== 3) {
               throw new Error();
            }
         });
      });
   });

   describe('#run()', () => {
      const isBeginEnd = (obj) => {
         return obj.begin !== true && obj.end !== true;
      };

      describe('without', () => {
         it('run', () => {
            without.run();
         });

         it('check props', () => {
            if (isBeginEnd(without)) {
               throw new Error();
            }
         });
      });

      describe('with params:state', () => {
         it('run', () => {
            wState.run();
         });

         it('check props', () => {
            if (isBeginEnd(wState)
               || wState.state.values.name !== 'name') {
               throw new Error();
            }
         });
      });

      describe('with params:scenes', () => {
         it('run', () => {
            wScenes.run();
         });

         it('check props', () => {
            if (isBeginEnd(wScenes)
               || wScenes.scenes.length !== 3) {
               throw new Error();
            }
         });
      });

      describe('with params', () => {
         it('run', () => {
            wParams.run();
         });

         it('check props', () => {
            if (isBeginEnd(wScenes)
               || wScenes.scenes.length !== 3
               || wState.state.values.name !== 'name') {
               throw new Error();
            }
         });
      });
   });
});
