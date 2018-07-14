import Notify from '../Notify';
import log from '../common';
import colors from 'colors';

let notify;

let count;

function defCount() {
   count = {
      event1: 0,
      event21: 0,
      event22: 0
   };
};

function getEvents(key) {
   return {
      event1: () => { count.event1++ },
      event2: [
         () => { count.event21++ },
         () => { count.event22++ }
      ]
   };
};

function emit() {
   notify.emit('event1');
   notify.emit('event2');
   notify.emit('event1');
   notify.emit('event2');
};

function subscribeEvent1() {
   const event1 = () => { count.event1++ };

   notify = new Notify({ event1: event1 }, { event1: event1 });

   notify.on('event1', event1);
   notify.on({
      event1: event1
   });
   notify.once('event1', event1);
   notify.once({
      event1: event1
   });

   return event1;
};

function onAfterInit() {
   notify.on('event1', () => { count.event1++ });
   notify.on(getEvents('on'));

   notify.once('event1', () => { count.event1++ });
   notify.once(getEvents('once'));
};

describe('Notify', () => {
   it('subscribe' + ' on'.green + ' initialize'.grey, () => {
      defCount();

      notify = new Notify(getEvents('on'), getEvents('once'));

      emit();

      if (count.event1 !== 3 || count.event21 !== 3 || count.event22 !== 3) {
         throw new Error();
      }
   });

   it('subscribe' + ' after'.green + ' initialize'.grey, () => {
      defCount();

      notify = new Notify();

      onAfterInit();

      emit();

      if (count.event1 !== 6 || count.event21 !== 3 || count.event22 !== 3) {
         throw new Error();
      }
   });

   describe('#off()', () => {
      it('all', () => {
         defCount();

         notify = new Notify(getEvents('on'), getEvents('once'));

         onAfterInit();

         notify.off();

         emit();

         if (count.event1 !== 0 || count.event21 !== 0 || count.event22 !== 0) {
            throw new Error();
         }
      });

      it('event', () => {
         defCount();

         subscribeEvent1();

         notify.off('event1');

         emit();

         if (count.event1 !== 0) {
            throw new Error();
         }
      });

      it('handler', () => {
         defCount();

         const event1 = subscribeEvent1();

         notify.off('event1', event1);

         emit();

         if (count.event1 !== 0) {
            throw new Error();
         }
      });

      it('handler set', () => {
         defCount();

         const eventSet = [
            () => { count.event1++ },
            () => { count.event1++ }
         ];

         notify = new Notify({ event1: eventSet }, { event1: eventSet });

         notify.on('event1', eventSet);
         notify.on({ event1: eventSet });

         notify.once('event1', eventSet);
         notify.once({ event1: eventSet });

         notify.off('event1', eventSet);

         emit();

         if (count.event1 !== 0) {
            throw new Error();
         }
      });

   });

   describe('#emit()', () => {
      it('without error', () => {
         defCount();

         notify = new Notify({
            event1: [
               x => { count.event1 = count.event1 + x },
               x => { count.event1 = count.event1 + x }
            ]
         });

         notify.emit('event1', 1);

         if (count.event1 !== 2) {
            throw new Error();
         }
      });

      it('with error', () => {
         defCount();

         notify = new Notify({
            event1: [
               x => { count.event1 = count.event1 + x; return new Error(); },
               x => { count.event1 = count.event1 + x }
            ]
         });

         notify.emit('event1', 1);

         // console.log(count)

         if (count.event1 !== 1) {
            throw new Error();
         }
      });

      it('once', () => {
         defCount();

         notify = new Notify(null, {
            event1: [
               x => { count.event1++ },
               x => { count.event1++ }
            ]
         });

         emit();

         if (count.event1 !== 2) {
            throw new Error();
         }
      });
   });

   it('#destoy subscriber', () => {
      notify = new Notify();

      let test = {
         func: function() {
            console.log('test');
         }
      };

      notify.on('test', test.func);

      notify.emit('test');

      test = null;

      notify.emit('test');
   });
});
