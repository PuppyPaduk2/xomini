const path = require('path');
const env = require('dotenv').config().parsed;

const dirDist = path.resolve([env.DIR_DIST, 'client'].join('/'));

module.exports = {
   entry: './src/client',
   output: {
      filename: 'bundle.js',
      path: dirDist
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
         use: [{
            loader: 'style-loader' // creates style nodes from JS strings
         }, {
            loader: 'css-loader' // translates CSS into CommonJS
         }, {
            loader: 'less-loader' // compiles Less to CSS
         }]
      }]
   },
   devServer: {
      contentBase: './dist'
   },
   resolve: {
      extensions: ['*', '.js', '.jsx']
   },
   mode: 'development'
};