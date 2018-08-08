export const types = {
   add: 'SOCKET_ADD',
   remove: 'SOCKET_REMOVE',
   emit: 'SOCKET_EMIT',
   once: 'SOCKET_ONCE',
   on: 'SOCKET_ON'
};

export * as actions from './actions';

export default function(store = null, action) {
   const { type } = action;

   if (type === types.add) {
      return action.socket;
   } else if (type === types.remove) {
      return null;
   } else if (type === types.emit && store) {
      store.emit(action.nameEvent, ...action.args);
   } else if (type === types.once && store) {
      store.once(action.nameEvent, action.callback);
   } else if (type === types.on) {
      store.on(action.nameEvent, action.callback);
   }

   return store;
};
