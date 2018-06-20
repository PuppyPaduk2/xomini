import { Notify } from './Notify';

const notify = new Notify({
   events: {
      init: () => {
         console.log('init-0');
      }
   }
});

notify.on({
   init() {
      console.log('init');
   }
});

let func = (x) => {
   console.log('init5', x);
};

notify.on({
   init: [function(...args) {
      console.log('init2', args);
   }, (...args) => {
      console.log('init3', args);
   }, (...args) => {
      console.log('init4', args);
   }, func]
});

func = func.bind(this, 22222);

notify.on({
   init: func
});

notify.emit('init').off('init', func).pipe(() => {
   console.log(' ');
}).emit('init').pipe(() => {
   console.log('>>> end 1');
   console.log(' ');
});

func = [function(...args) {
   console.log('init22', args);
}, (...args) => {
   console.log('init23', args);
}, true, false, new Promise(x => {}), (...args) => {
   console.log('init24', args);
}, func];

notify.on('init', func).emit('init').off('init', func).pipe(() => {
   console.log(' ');
}).emit('init').pipe(() => {
   console.log(' ');
});
