import { expect, assert } from 'chai';
import Notify from '../Notify';

let notify1, notify2;

describe('Notify', () => {
   it('new', () => {
      notify1 = new Notify({
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
      notify2 = new Notify();

      console.log(notify1.handlers);
   });
});
