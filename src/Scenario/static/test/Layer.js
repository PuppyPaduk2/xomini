import Layer from '../Layer';
import chai from 'chai';

const assert = chai.assert;

let layer;
let state = {
   players: [],
   events: 0
};

function getLayer(name) {
   return new Layer({
      // parallel: true,
      state: state,
      elements: [
         (values, res) => {
            console.log('@scene1', values);

            // if (values.events === 2) {
            //    return { players: ['@user'], events: 3 };
            // } else {
               res();
            // }
         },
         (values, res) => {
            console.log('@scene2', values);
            res();
         }
      ]
   }, {
      once: {
         begin: () => {
            console.log('@begin', name);
         },
         end: () => {
            console.log('@end', name);
         }
      }
   });
};

describe('Layer', () => {
   it('#new()', () => {
      layer = getLayer('L1');
      layer.next = getLayer('L2');

      layer.values = { events: 1 };
      layer.run();
      layer.values = { events: 2 };

      console.log(layer.values)
      // layer.stop();
      layer.values = { events: 4 };

      console.log(layer.values)
      layer.values = { events: 6 };

      console.log(layer.values)

      layer.next.values = { events: 111 };

      console.log(layer.values)
   });
});
