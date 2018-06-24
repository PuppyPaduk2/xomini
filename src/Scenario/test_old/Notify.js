import Notify from '../Notify';

let notify;

describe('Notify', () => {

   describe('#new()', () => {
      const params = [
         {
            init: () => { },
            render: [
               () => { },
               () => { }
            ]
         }, {
            init: [
               () => { },
               () => { }
            ],
            render: () => { }
         }
      ];

      it('without params', () => {
         notify = new Notify();
      });

      it('with params:on', () => {
         new Notify(params[0]);
      });

      it('with params:once', () => {
         new Notify(null, params[0]);
      });

      it('with params:all', () => {
         new Notify(...params);
      });
   });

   ['on', 'once'].forEach(method => {
      describe('#' + method + '()', () => {
         const nameEvent = 'event-' + method;
         const nameEvent1 = 'many-event-1-' + method;
         const nameEvent2 = 'many-event-2-' + method;

         describe('one event', () => {
            it('simple', () => {
               notify[method](nameEvent, () => { });
            });

            it('set', () => {
               notify[method](nameEvent, [
                  () => { },
                  () => { }
               ]);
            });

            it('set with return error', () => {
               notify[method](nameEvent, [
                  () => { return Error(); },
                  () => { console.log('set with return error!'); }
               ]);
            });

            it('emit', () => {
               notify.emit(nameEvent);
            });
         });

         describe('many event', () => {
            it('simple', () => {
               const events = {};
               events[nameEvent1] = () => { };
               events[nameEvent2] = () => { };
               notify[method](events);
            });

            it('set', () => {
               const events = {};
               events[nameEvent1] = [
                  () => { },
                  () => { }
               ];
               notify[method](events);
            });

            it('set with return error', () => {
               const events = {};
               events[nameEvent1] = [
                  () => { return Error(); },
                  () => { console.log('error-' + nameEvent2); }
               ];
               notify[method](events);
            });

            it('emit', () => {
               notify.emit(nameEvent1);
               notify.emit(nameEvent2);
            });
         });
      });
   });

   describe('#off()', () => {
      ['on', 'once'].forEach(key => {
         describe(key, () => {
            const keyEvent = key + '-event';
            const keyCallback = key + '-callback';
            const keyCallbackSet = key + '-callbackSet';

            it('event', () => {
               notify[key](keyEvent, () => { console.log(keyEvent); });
               notify.off(keyEvent);
            });

            it('callback', () => {
               const callback = () => { console.log(keyCallback); };
               notify[key](keyCallback, callback);
               notify.off(keyCallback, callback);
            });

            it('callback set', () => {
               const callbackSet = [
                  () => { console.log(keyCallbackSet + ':1'); },
                  () => { console.log(keyCallbackSet + ':1'); }
               ];
               notify[key](keyCallbackSet, callbackSet);
               notify.off(keyCallbackSet, callbackSet);
            });

            it('emit', () => {
               notify.emit(keyEvent);
               notify.emit(keyCallback);
               notify.emit(keyCallbackSet);
            });
         });
      });

      it('all', () => {
         const onAll = 'off-on-all';
         const onceAll = 'off-once-all';

         notify.on(onAll, () => { console.log(onAll) });
         notify.on(onceAll, () => { console.log(onceAll) });
         notify.off(onAll);
         notify.off(onceAll);
         notify.emit(onAll);
         notify.emit(onceAll);
      });
   });

   describe('#setProp()', () => {
      it('deaftul', () => {
         notify.setProp('begin', true);
      });

      it('with callback', () => {
         notify.setProp('begin', true, () => { });
      });
   });
});
