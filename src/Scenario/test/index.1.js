import Scenario from './index';
import State from './State';

let stateValues = { name: 'scenario' };
let state = new State(stateValues);
let scene1 = function(state, res) {
   console.log('scene #1 >>>', state.values);

   const scenario = new Scenario(state, [
      function(state, result) {
         state.values = { name: state.values.name + ' $1' };
         console.log('scene $1 >>>', state.values);
         result();
      },

      function(state, result) {
         state.values = { name: state.values.name + ' $2' };
         console.log('scene $2 >>>', state.values);
         result();
      }
   ], {
         handlersOnce: {
            end: function() {
               res();
            }
         }
      });

   scenario.run();
};
let scene2 = function(state, res) {
   console.log('scene #2 >>>', state.values);

   state.values = { name: '#2' };

   setTimeout(() => {
      res();
   }, 1000);
};
let scene3 = function(state, res) {
   state.values = { name: '#3' };

   console.log('scene #3 >>>', this.state.current.values);

   setTimeout(() => {
      res();
   }, 500);
};
let scenes = [scene1, scene2, scene3];

function getScenario() {
   return new Scenario(state, scenes);
};

getScenario().on({
   begin: function() {
      console.log('begin');
   },
   end: function() {
      console.log('end >>>', this.state.values);
   }
}).run();
