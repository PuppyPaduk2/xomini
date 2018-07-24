'use strict';

const defaultConfig = require('./webpack/default.config');
module.exports = [
   defaultConfig({
      dir: 'client',
      entry: {
         'index': 'index.js'
      }
   }),

   defaultConfig({
      dir: 'server',
      entry: {
         'index': 'index.js'
      },
      target: 'node',
      externals: ['uws'],
      stats: {
         warnings: false
      }
   })
];