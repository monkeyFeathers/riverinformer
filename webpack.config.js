var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  resolve: {
    nodeDirectories: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  },
};
