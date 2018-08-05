import { Component } from 'react';

export default class extends Component {
   socketOn = (handlers = {}) => {
      socketOn(this.socket, handlers);
   };

   socketEmit = (nameEvent, ...args) => {
      socketEmit(this.socket, nameEvent, ...args);
   };
};

/**
 * @param {Socket} socket
 * @param {Object} handlers
 */
export function socketOn(socket, handlers = {}) {
   if (socket && socket.emit) {
      Object.keys(handlers).forEach(nameEvent => {
         let eventHandlers = handlers[nameEvent];

         if (eventHandlers instanceof Function) {
            eventHandlers = [eventHandlers];
         }

         if (eventHandlers instanceof Array) {
            eventHandlers.forEach(handler => {
               if (handler instanceof Function) {
                  socket.on(nameEvent, handler);
               }
            });
         }
      });
   }
};

/**
 * @param {Socket} socket
 * @param {String} nameEvent
 * @param {Array} [args]
 */
export function socketEmit(socket, nameEvent, ...args) {
   if (socket && socket.emit) {
      socket.emit(nameEvent, ...args);
   }
};
