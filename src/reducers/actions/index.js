import { typesAll } from './types';

export function fetch(store) {
   return {
      type: typesAll.fetch,
      ...store
   };
};
