import State from '../Scenario/io/server/State';
import StaticState from '../Scenario/static/State';

let staticState = new StaticState({
   count: 0
});
let state;

export default function(socket) {

   socket.on('signIn', (params) => {
      console.log(params);

      socket.join('q');

      if (!state) {
         state = new State(this.to('q'));
      }

      this.to('q')
         .emit('state:change', '123', socket.id);

   });

};
