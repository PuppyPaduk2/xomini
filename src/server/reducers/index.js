import { combineReducers } from 'redux';

export default {
   rooms: (state = [], action) => {
      if (action.type === 'ADD_ROOM') {
         return [
            ...state,
            action.name
         ];
      }

      return state;
   },
   users: (state = [], action) => {
      if (action.type === 'ADD_USER') {
         return [
            ...state,
            action.name
         ];
      }

      return state;
   },
   lastChange: combineReducers({
      user: (state = null, action) => {
         if (action.type === 'ADD_USER') {
            return action.name;
         }

         return state;
      },
      password: (state = null, action) => {
         return state;
      }
   })
};
