/**
 * @param {Function} value
 * @param {Socket} socket
 * @param {String} nameEvent
 */
export function reducer(value, socket, nameEvent = 'store:change') {
   let prev;

   return (state, action) => {
      const result = value.call(this, state, action);

      if (!action.type.match(/@@redux/g)) {
         if (prev !== result) {
            prev = result;

            if (socket && socket.emit) {
               socket.emit(nameEvent, action);
            }
         }
      } else {
         prev = result;
      }

      return result;
   };
};