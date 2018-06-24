import colors from 'colors';

colors.enabled = true;

const log = console.log;

export default function(...args) {
   args[0] = ('\u2022 ' + args[0]).gray;
   log(...args);
}
