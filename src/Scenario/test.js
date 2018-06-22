import Scenario from './index';
import State from './State';

let stateValues = { name: 'scenario' };
let state = new State(stateValues);
let scene1 = function(state, res) {
   console.log('scene #1 >>>', state.values);

   state.values = { name: '#1' };

   setTimeout(() => {
      res();
   }, 1500);
};
let scene2 = function(state, res) {
   console.log('scene #2 >>>', this.state.end);

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
let scenario = new Scenario(state, scenes);

scenario.on({
   begin: function() {
      console.log('begin');
   },
   end: function() {
      console.log('end >>>', this.state.values);
   }
});

scenario.run();
