import Scenario from '../Scenario';
import State from '../State';

describe('Scenario', () => {
   console.log('____________________________________________________');

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
   let scenes = [scene1];
   
   function getScenario() {
      return new Scenario(state, scenes);
   };

   it('create', () => {
      const scenario = getScenario();

      describe('run', () => {
         it('run', () => {
            scenario.on({
               begin: function() {
                  console.log('begin');
               },
               end: function() {
                  console.log('end >>>', this.state.values);
               }
            }).run();
         });
      });
   });
});