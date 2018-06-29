import State from '../Scenario/io/State';

let state;

export default function(socket) {
   if (!state) {
      state = new State(this, {
         count: 0
      });
   }

   state.setValue({
      count: state.getValue('count') + 1
   });

   console.log('#connection', socket.id, state.values);

   socket.on('disconnecting', () => {
      state.setValue('count', state.getValue('count') - 1);

      console.log('#disconnecting', socket.id, state.values);
   });
};
