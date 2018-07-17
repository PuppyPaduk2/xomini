import Layer from '../Layer';
import chai from 'chai';

const assert = chai.assert;

let layer;
let state = {
   players: [],
   events: 0
};

describe('Layer', () => {
   it('#new()', () => {
      layer = new Layer({
         state: state,
         scenes: [
            (values, res) => {
               if (values.events === 2) {
                  return { players: ['@user1'], events: 3 };
               } else {
                  res();
               }
            },
            (values, res) => {
               console.log('@scene2', values)
               res();
            }
         ]
      }, {
         once: {
            begin: () => {
               console.log('@begin');
            },
            end: () => {
               console.log('@end');
            }
         }
      });

      layer.values = { events: 1 };
      layer.run();
      layer.values = { events: 2 };
      layer.stop();
      layer.values = { events: 3 };
   });
});
