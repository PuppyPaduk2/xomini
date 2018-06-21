import Scenario from '../Scenario';
import Scene from '../Scenario/Scene';
import Action from '../Scenario/Action';
import State from '../Scenario/State';

let state = new State({ begin: false, name: 'It is test state', end: false });
let action = new Action(state, function(state, res, rej) {
   res(state);
});
let scene = new Scene();

// console.log(state);
// console.log();
// console.log(action);
// console.log();
// console.log(scene);