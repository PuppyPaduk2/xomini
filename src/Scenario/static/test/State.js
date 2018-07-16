import State from '../State';
import chai from 'chai';

const assert = chai.assert;

let state;
let values1 = { name: 'player' };
let values2 = { name: 'name player', count: 2 };
let values3 = { name: 'user name', count: 3 };

describe('State', () => {
   describe('#new()', () => {
      it('without params', () => {
         state = new State();
      });

      it('with params', () => {
         state = new State(values1);
      });
   });

   describe('props', () => {
      it('#values', () => {
         state.values = values2;
         assert.equal(state.values.name, 'name player');
         assert.equal(state.values.count, undefined);
      });

      it('#prev', () => {
         assert.equal(state.prev.name, 'player');
         assert.equal(state.prev.count, undefined);
      });

      it('#change', () => {
         assert.equal(state.change.name, 'name player');
         assert.equal(state.change.count, undefined);
      });
   });

   describe('handlers', () => {
      it('change', () => {
         state.on('change', (val) => {
            state.values = { name: 'new user name' };
         });

         state.values = values3;

         assert.equal(state.values.name, 'new user name');
      });
   });
});
