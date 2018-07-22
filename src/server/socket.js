import Room from '../state.io/io/server/Room';
import State from '../state.io/io/server/State';
import StaticState from '../state.io/static/State';

let staticState = new StaticState({
   count: 0,
   user: new StaticState({
      name: '@user'
   })
});

export default function(socket) {
   let state;

   // new Room(this, socket, new StaticState({
   //    app: '@app'
   // }));

   socket.join('q')

   new State(this.to('q'), staticState, {
      on: {
         change: () => {
            console.log('@on:change')
         }
      }
   });

   socket.on('signIn', (params) => {
      // let room = 'q';

      // if (!this.to('q').state) {
      //    console.log('@1');
      //    this.to('q').state = staticState;
      // } else {
      //    console.log('@2');
      // }

      staticState.values = { count: staticState.values.count + 1 };

      // new Room(this, socket, staticState, { room: params.room });

      // if (socket.rooms[room]) {
      //    staticState.values = { count: staticState.values.count + 1 };
      // } else {
         // socket.join(room, () => {
      //       state = new State(this.to('q'), staticState);
      //       staticState.values = { count: staticState.values.count + 1 };
         // });
      // }

   });

   // socket.on('disconnect', () => {
   //    if (state) {
   //       state.off();
   //       state = null;
   //    }
   // });

};
