import State from '../State';

let simple;
let withParams;

describe('State', () => {
   describe('#new()', () => {
      describe('simple', () => {
         it('new', () => {
            simple = new State();
         });

         it('set values', () => {
            simple.values = { name: 'name' };
         });

         it('values', () => {
            if (Object.keys(simple.values).length) {
               throw new Error('values');
            }
         });

         it('change', () => {
            if (Object.keys(simple.change).length) {
               throw new Error('change');
            }
         });
      });

      describe('with params', () => {
         it('new', () => {
            withParams = new State({
               begin: false,
               end: false,
               name: 'name'
            });
         });

         it('values', () => {
            if (!Object.keys(withParams.values).length) {
               throw new Error('values');
            }
         });

         it('set values', () => {
            withParams.values = { name: 'set name' };
         });

         it('check values', () => {
            if (withParams.values.name !== 'set name') {
               throw new Error('check values');
            }
         });

         it('change', () => {
            const change = withParams.change;

            if (change.name && change.name.prev !== 'name'
               && change.name.values !== 'set name') {
               throw new Error('change');
            }
         });
      });
   });

   describe('#clone()', () => {
      it('simple', () => {
         if (simple.clone().values === simple.values) {
            throw new Error('clone simple');
         }
      });

      it('with params', () => {
         const clone = withParams.clone();
         const values = clone.values;

         if (values.name !== 'set name'
            && values.begin !== false && values.end !== false) {
            throw new Error('change errors');
         }

         if (values === withParams.values) {
            throw new Error('it is no correct clone');
         }
      });
   });
});
