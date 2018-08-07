/**
 * @param {Namespace} namespace
 * @param {Object} callbacks
 */
export default function(namespace, callbacks = {}) {
   namespace.on('connection', socket => {
      Object.keys(callbacks).forEach(nameEvent => {
         let eventCallbacks = callbacks[nameEvent];

         if (eventCallbacks instanceof Function) {
            eventCallbacks = [eventCallbacks];
         }

         eventCallbacks.forEach(callback => {
            subscribe(socket, nameEvent, callback);
         });
      });

      // subscribe(socket, 'rooms#create', (nameRoom, login) => {
      //    const accessUserAct = roomsActions.accessUser(nameRoom, login);

      //    dispatch(accessUserAct);

      //    if (accessUserAct.access) {
      //       socket.nameRoom = nameRoom;
      //       socket.login = login;
      //       socket.join(nameRoom);

      //       dispatch(roomsActions.create(nameRoom));
      //       dispatch(roomsActions.addUser(nameRoom, login));

      //       socket.emit(
      //          'actions',
      //          userConfigActions.setNameRoom(nameRoom),
      //          userConfigActions.setLogin(login)
      //       );

      //       namespace.to(nameRoom).emit(
      //          'actions',
      //          usersActions.update(
      //             store.getState()[nameRoom].users
      //          )
      //       );
      //    }

      //    return accessUserAct.access;
      // });

      // subscribe(socket, 'rooms#removeUser', removeUser.bind(this, namespace, socket, store));
      // subscribe(socket, 'disconnecting', removeUser.bind(this, namespace, socket, store));
   });
};

/**
 * @param {Socket} socket
 * @param {String} nameEvent
 * @param {Function} callback
 */
export function subscribe(socket, nameEvent, callback) {
   socket.on(nameEvent, (...args) => {
      const { result } = callback.call(socket, ...args) || {};

      if (result) {
         socket.emit(nameEvent + ':result', result);
      }
   });
};
