const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   entry: './src/client',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [{
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
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