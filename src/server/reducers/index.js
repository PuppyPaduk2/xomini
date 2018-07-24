import { combineReducers } from 'redux';
import { reducer } from '../../socket-redux.io';

/**
 * @param {Socket} socket
 */
export default function(socket) {
   return combineReducers({
      user: combineReducers({
         name: reducer((state = '', action) => {
            if (action.type === 'SET_NAME') {
               return action.value;
            }

            return state;
         }, socket),
         lastName: reducer((state = '', action) => {
            if (action.type === 'SET_LASTNAME') {
               return action.value;
            }

            return state;
         }, socket)
      }),
      rooms: reducer((state = [], action) => {
         if (action.type === 'ADD_ROOM' && state.indexOf(action.value) === -1) {
            return [...state, action.value];
         }

         return state;
      }, socket)
   });
};
