export default function(store = [], action) {
   if (action.type === 'ADD_TEST') {
      return [
         ...srore,
         action.value
      ];
   }

   return store;
};
