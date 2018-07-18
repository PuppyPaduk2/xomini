import { expect, assert } from 'chai';
import Notify from '../Notify';

let notify1, notify2;

describe('Notify', () => {
   it('new', () => {
      notify1 = new Notify({
         once: {
            event1: () => {
               console.log('@event1');
            },
            event2: [
               () => {
                  console.log('@event2:1');
               },
               () => {
                  console.log('@event2:2');
               }
            ]
         }
      });
      notify2 = new Notify();
   });

   it('simple', () => {
      notify1.once({
         event1: () => {
            console.log('@event1.2');
         }
      });
      notify1.once({
         event1: () => {
            console.log('@event1:3:notify2');
         }
      }, notify2);

      notify1.emit('event1');
      notify1.emit('event2');
      notify2.emit('event1');
      notify1.emit('event1');
      notify1.emit('event2');
      notify2.emit('event1');
   });

   it('off()', () => {
      notify1.on({
         event1: () => {
            console.log('@event1:3:notify2');
         }
      }, notify2);
      notify1.on({
         event1: () => {
            console.log('@event1:3:notify2');
         }
      });

      console.log('@1', notify1.countHandlers);
      console.log('@2', notify2.countHandlers);

      notify1.off(notify2);

      console.log('@1', notify1.countHandlers);
      console.log('@2', notify2.countHandlers);
   });
});
