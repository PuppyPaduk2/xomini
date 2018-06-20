const path = require('path');
const env = require('dotenv').config().parsed;

const mode = 'development';

/**
 * @param {Object} options
 */
const createTarget = function(options) {
   const md = options.module || {};

   return {
      entry: options.entry,
      output: {
         filename: '[name].js',
         path: path.resolve([env.DIR_DIST, options.dir || ''].join('/'))
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
         noParse: md.noParse
      },
      resolve: {
         extensions: ['*', '.js', '.jsx']
      },
      devtool: 'source-map',
      externals: options.externals,
      mode: options.mode,
      node: options.node,
      target: options.target,
      stats: options.stats
   }
};

const client = createTarget({
   dir: 'client',
   entry: {
      'index': './src/client/index.js'
   },
   mode: mode
});


const server = createTarget({
   dir: 'server',
   entry: {
      'index': './src/server/index.js'
   },
   target: 'node',
   mode: mode,
   externals: ['uws'],
   stats: {
      warnings: false
   }
});

module.exports = [client, server];