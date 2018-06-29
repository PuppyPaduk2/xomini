import State from '../Scenario/io/State';

let state;

export default function(socket) {
   socket.on('signIn', (params) => {
      const room = params.room;

      if (!socket.rooms[room]) {
         socket.join(room, () => {
            console.log('#TODO ...code');
            // socket.to(room).emit('join')

            console.log('singIn', params, socket.rooms);
         });
      } else {
         console.log(socket.to(room) === socket);
      }
   });
};
