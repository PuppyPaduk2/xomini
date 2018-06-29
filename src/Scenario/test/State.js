import State from '../State';
import log from '../common';

let state;
let values1 = { name: 'player' };
let values2 = { name: 'name player', count: 2 };
let values3 = { name: 'user name', count: 3 };

describe('State', () => {
   it('format null', () => {
      state = new State();

      state.values = values1;

      if (state.values.name) {
         throw new Error();
      }
   });

   it('exist format', () => {
      state = new State(values1);

      if (state.values.name !== 'player') {
         throw new Error();
      }
   });

   it('set values', () => {
      state = new State(values1);

      state.values = values2;

      if (state.values.name !== 'name player'
         || !!state.values.count) {
         throw new Error();
      }
   });

   it('subcribe on event "change"', () => {
      let count = 0;

      state = new State(values1, {
         change: () => { count++; }
      }, {
            change: () => { count++; }
         });

      state.on('change', () => { count++; });

      state.values = values2;
      state.values = values2;

      if (count !== 3) {
         throw new Error();
      }
   });
});
