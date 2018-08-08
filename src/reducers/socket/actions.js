import { types } from '.';

export function add(socket) {
   return {
      type: types.add,
      socket
   };
};

export function remove() {
   return {
      type: types.remove
   };
};

export function emit(nameEvent, ...args) {
   return {
      type: types.emit,
      nameEvent,
      args
   };
};

export function once(nameEvent, callback) {
   return {
      type: types.once,
      nameEvent,
      callback
   };
};

export function on(nameEvent, callback) {
   return {
      type: types.on,
      nameEvent,
      callback
   };
};
