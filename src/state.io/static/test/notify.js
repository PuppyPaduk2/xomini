import { expect, assert } from 'chai';
import Notify from '../Notify';

let notify1, notify2;

describe('Notify', () => {
   it('new', () => {
      notify1 = new Notify();
      notify2 = new Notify({
         on: {
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

      notify1.on({
         event1: () => {
            console.log('@event1:1');
         }
      }, notify2);

      notify2.emit('event1', 1, '2', { a: 3 });
   });
});
