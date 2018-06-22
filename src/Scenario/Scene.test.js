import Scene from '../Scenario/Scene';
import State from '../Scenario/State';

// State

let state = { name: 'state' };

let state1 = new State(state);
let state2 = new State(state);

console.log('state1 >>>', state1.values);
console.log('state2 >>>', state2.values);
console.log();

state1.values = { name: state1.values.name + '#1' };

console.log('state1 >>>', state1.values);
console.log('state2 >>>', state2.values);
console.log();

state2.values = state1.values;
state2.values = { name: state2.values.name + '#2' };

console.log('state1 >>>', state1.values);
console.log('state2 >>>', state2.values);
console.log();

state1 = new State(state);
state2 = state1.clone();

console.log('state1 >>>', state1.values);
console.log('state2 >>>', state2.values);
console.log();

state2.values = { name: state2.values.name + '#2' };

console.log('state1 >>>', state1.values);
console.log('state2 >>>', state2.values);
console.log();

// Scene

let scene = new Scene(state2, function(state, res) {
   state.values.name = 'It is test scene!!!';
   res();
});

scene.on('end', () => {
   console.log('end');
   console.log(scene.state.begin.values);
   console.log(scene.state.end.values);
});

scene.run();