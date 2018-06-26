import colors from 'colors';

colors.enabled = true;

const log = console.log;

export default function(...args) {
   if (args[0] instanceof Object) {
      args[0] = JSON.stringify(args[0]);
   }

   args[0] = ('\u2022 ' + args[0]).gray;
   log(...args);
}

/**
 * @param {String} messame
 */
export function err(messame) {
   throw new Error(messame || '');
};
