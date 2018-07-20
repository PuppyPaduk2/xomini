import { expect, assert } from 'chai';
import Notify from '../Notify';

let notify1, notify2;

describe('Notify', () => {
   it('new', () => {
      notify1 = new Notify();
      notify2 = new Notify();

      notify1.on({
         event1: [(value) => {
            console.log('@event1:1', value);
            return value + ' add value!';
         }, (value) => {
            console.log('@event1:2', value);
         }]
      }, notify2);

      notify2.emit('event1', 1, '2', { a: 3 });
      notify1.emit('event1', 1, '2', { a: 3 });

      notify1.once({
         event1: (...args) => {
            console.log('event1:once', ...args);
         }
      });

      notify1.emit('event1', 1, '2', { a: 3 });
      notify1.emit('event1', 1, '2', { a: 3 });
   });

   it('emit with error', () => {
      notify1 = new Notify({
         on: {
            event: [
               () => {
                  console.log('@event_1');
               },
               (value) => {
                  console.log('@event_2');

                  if (!value) {
                     return new Error();
                  }
               }
            ]
         },
         once: {
            event: () => {
               console.log('@event_after_error');
            }
         }
      });

      notify1.emit('event').emit('event', true)
         .emit('event', true);
   });

   it('off', () => {
      notify1 = new Notify({
         on: {
            event: () => { }
         }
      });
      notify2 = new Notify();
      let notify3 = new Notify();
      let func1 = () => { }

      notify2.on({
         event: [func1, () => { }]
      }, notify1);

      notify2.once({
         event: () => { }
      }, notify3);

      notify2.off({
         event: func1
      }, notify1);

      console.log('@notify1', notify1.listeners.event.length);

      notify2.off();

      console.log('@notify1', notify1.listeners.event.length);

      notify2.once({
         event: () => { }
      }, notify3);

      console.log('@notify3', notify3.listeners.event.length);

      notify2.off(notify1);

      console.log('@notify3', notify3.listeners.event.length);

      notify2.off(notify3);

      console.log('@notify3', notify3.listeners.event.length);

      const func2 = () => { };

      notify1 = new Notify({
         on: {
            event: [func1, func1, func2]
         }
      });

      console.log('@notify1.handlers', notify1.handlers.event.length);

      notify1.off({
         event: func1
      }, notify2);

      console.log('@notify1.handlers', notify1.handlers.event.length);

      notify1.off({
         event: func1
      });

      console.log('@notify1.handlers', notify1.handlers.event.length);

      notify1.on({
         event: func1
      });

      console.log('@notify1.handlers', notify1.handlers.event.length);

      notify1.off({
         event: [func1, func2]
      });

      console.log('@notify1.handlers', notify1.handlers);
   });
});
