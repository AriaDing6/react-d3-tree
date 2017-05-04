/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

const libraryName = 'react-d3-tree';

let plugins = [],
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'clone',
    'd3',
    'react',
    'uuid',
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js', '.css'],
  },
  plugins,
};

module.exports = config;