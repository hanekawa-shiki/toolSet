'use strict';
const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
const config = require('../config');
const { resolve } = require('./utils');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['./src/main.js'],
  output: {
    clean: true,
    filename: '[name].[hash:8].js',
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' }],
      },

      {
        test: /\.m?js?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
        include: [resolve('src/icons')],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new NodePolyfillWebpackPlugin()],
  target: 'browserslist',
};
