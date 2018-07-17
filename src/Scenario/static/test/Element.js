import Element from '../Element';
import chai from 'chai';

const assert = chai.assert;

let element;
let count = 0;

describe('Element', () => {
   it('#new()', () => {
      element = new Element({
         on: {
            begin: () => { count++; },
            end: () => { count++; }
         }
      });

      element.name = '@nameElement';
      element.begin = true;
      element.name = 'test change name';
      element.end = true;

      assert(element.name, '@nameElement');
      assert(count, 2);
   });

   describe('#reset()', () => {
      it('no', () => {
         element = new Element();
         element.begin = true;
         element.reset();
         assert(element.begin, true);
      });

      it('yes', () => {
         element.end = true;
         element.reset();
         assert(element.begin === false, true);
      });
   });

   describe('#run()', () => {
      it('simple', () => {
         count = 0;

         element = new Element({
            once: {
               next: () => {
                  count++;
               }
            }
         });

         element.next = new Element({
            once: {
               begin: () => {
                  count++;
               },
               end: () => {
                  count++;
               }
            }
         });

         element.run();
      });
   });

   describe('#stop()', () => {
      it('simple', () => {
         element.stop().next.stop();
         assert(count, 3);
      });
   });
});
