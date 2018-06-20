'use strict';

const path = require('path');
const env = require('dotenv').config().parsed;

/**
 * @param {Object} options
 */
module.exports = function(options) {
   options = options instanceof Object ? options : {};

   const ROOT = options.root || env.ROOT || './';
   const DIR_DIST = options.dirDist || env.DIR_DIST || './';

   const dir = options.dir || '';
   const module = options.module || {};
   let entry = options.entry || {};

   if (entry instanceof Object) {
      Object.keys(entry).forEach(key => {
         const value = entry[key];
         entry[key] = [ROOT, dir, value].join('/');
      });
   }

   return {
      entry: entry,
      output: {
         filename: '[name].js',
         path: path.resolve(DIR_DIST, dir)
      },
      module: {
         rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['es2015', 'stage-0', 'react']
               }
            }
         }, {
            test: /\.css$/,
            loader: [
               { loader: 'style-loader' },
               { loader: 'css-loader' }
            ]
         }, {
            test: /\.less$/,
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' },
               { loader: 'less-loader' }
            ]
         }],
         noParse: module.noParse
      },
      resolve: {
         extensions: ['*', '.js', '.jsx']
      },
      devtool: 'source-map',
      externals: options.externals,
      mode: env.MODE,
      node: options.node,
      target: options.target,
      stats: options.stats
   }
};
