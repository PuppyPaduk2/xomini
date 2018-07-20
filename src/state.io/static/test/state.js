import State from '../State';
import { assert } from 'chai';

let state;

describe('State', () => {
   it('new', () => {
      state = new State({
         count: 0,
         user: new State({
            name: 'user',
            login: 'loginUser',
            in: new State({
               auth: false,
               reg: false
            })
         })
      }, {
         on: {
            change: (values, state) => {
               console.log(state.collectValues());
            }
         }
      });

      state.values.user.values = { name: '@user' };
      state.values.user.values.in.values = { reg: true };
   });
});
