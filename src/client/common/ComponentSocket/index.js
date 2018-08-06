import { Component } from 'react';
import io from 'socket.io-client';

export default class extends Component {
   socketCreate = () => {
      this.socket = socketCreate();
   };

   socketOn = (handlers = {}) => {
      socketOn(this.socket, handlers);
   };

   socketEmit = (nameEvent, ...args) => {
      socketEmit(this.socket, nameEvent, ...args);
   };
};

/**
 * @param {String[]} [url]
 * @param {Object} options
 */
export default function socketCreate(url, options = {}) {
   options = {
      transports: ['websocket'],
      upgrade: false,
      ...options
   };

   return io(url, options);
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
