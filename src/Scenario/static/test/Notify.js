import chai from 'chai';
import Notify from '../Notify';

const expect = chai.expect;
const assert = chai.assert;

const test = (count = 0) => {
   return count + 1;
};
const test2 = (count = 0) => {
   return count + 10;
};
const testErr = () => {
   return new Error('message error');
};

let notify;

function onOnce(notify, func) {
   describe(`#${func}()`, () => {
      it('function', () => {
         notify.off()[func]('test', test);

         assert.equal(notify.countHandlers().test[func], 1);
      });

      it('function[]', () => {
         notify.off()[func]('test', [test, test]);

         assert.equal(notify.countHandlers().test[func], 2);
      });

      it('object', () => {
         notify.off()[func]({
            test: test,
            test2: test2
         });

         const count = notify.countHandlers();

         assert.equal(count.test[func], 1);
         assert.equal(count.test2[func], 1);
      });

      it('object with array', () => {
         notify.off()[func]({
            test: [test, test],
            test2: [test2, test2]
         });

         const count = notify.countHandlers();

         assert.equal(count.test[func], 2);
         assert.equal(count.test2[func], 2);
      });
   });
};

function defOn(notify) {
   return notify.off().on({
      test: test,
      test2: [test2, test2]
   });
};

describe('Notify', () => {
   notify = new Notify({
      on: {
         test: test,
         test2: [test2, test2]
      },
      once: {
         test: test,
         test2: [test2, test2]
      }
   });

   it('#new + add handlers', () => {
      expect(notify.countHandlers()).to.deep.include({
         test: { on: 1, once: 1 },
         test2: { on: 2, once: 2 }
      });
   });

   onOnce(notify, 'on');
   onOnce(notify, 'once');

   describe('#off()', () => {
      it('all', () => {
         defOn(notify).off();

         expect(Object.keys(notify.countHandlers())).to.have.lengthOf(0);
      });

      describe('nameEvent (string)', () => {
         it('callback (undefined)', () => {
            defOn(notify).off('test');

            const count = notify.countHandlers();

            expect(count).to.deep.include({
               test2: { on: 2, once: 0 }
            });
            expect(count).to.have.keys(['test2']);
         });

         it('callback (Function)', () => {
            defOn(notify).off('test', test);

            expect(notify.countHandlers()).to.have.keys(['test2']);
         });

         it('callback (Array)', () => {
            defOn(notify).on('test', test2).off('test', [test, test2]);

            expect(notify.countHandlers()).to.have.keys(['test2']);
         });
      });

      describe('nameEvent (not string)', () => {
         it('callback (Function)', () => {
            defOn(notify).on('test2', test).off(test);

            expect(notify.countHandlers()).to.have.keys(['test2']);
            expect(notify.countHandlers()).to.deep.include({
               test2: { on: 2, once: 0 }
            });
         });

         it('callback (Array)', () => {
            defOn(notify).off([test, 'test2']);

            expect(notify.countHandlers()).to.have.not.keys(['test', 'test2']);
         });

         it('callback (Object)', () => {
            defOn(notify).on({
               test: test2,
               test2: test2
            }).off({
               test: [test, test2],
               test2: test2
            });

            expect(notify.countHandlers()).to.have.not.keys(['test', 'test2']);
         });
      })
   });

   describe('#emit()', () => {
      it('simple', () => {
         notify.off().on({
            test: [test, test2]
         });

         assert.equal(notify.emit('test'), 11);
      });

      it('error', () => {
         notify.off().on({
            test: [test, testErr, test2]
         });


         assert.equal(notify.emit('test', 10).prevResult, 11);
      });
   });

});
