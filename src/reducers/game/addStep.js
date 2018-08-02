import defaultStore from './defaultStore';

export default function(store = defaultStore(), action) {
   let { step, state, users } = store;
   let { login, value } = action;

   if (store.begin && login && value !== undefined && users[login]) {
      if (!step) {
         step = {};
         store.step = step;
      }

      if (!step[login]) {
         step[login] = value;

         const keysStep = Object.keys(step);

         if (keysStep.length === Object.keys(users).length) {
            store.point = isUnic(keysStep.map(key => step[key])) ? 1 : -1;
            store.summPoints += store.point;
            state.push(step);
            store.step = null;
         }
      }

      return { ...store };
   }

   return store;
};

function isUnic(values) {
   let _value = null;
   let result = true;

   values.forEach(value => {
      if (_value === null) {
         _value = value;
      } else if (_value !== value) {
         result = false;
      }
   });

   return result;
};
