var webpack = require('webpack');
var PATHS = require('./config/PATHS');
var PORTS = require('./config/PORTS');
var config = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// var SOURCE_MAP = true;     大多数情况下用不到
var SOURCE_MAP = false;

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map': false;

// add hot-reload related code to entry chunk
config.entry.app = [
  "eventsource-polyfill",
  "webpack-hot-middleware/client?reload=true",
  config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌CSS以支持热替换
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css'
}, {
  test: /\.less$/,
  loader: 'style!css!less'
}, {
  test: /\.scss$/,
  loader: 'style!css!sass'
});

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: PATHS.SRC.join('index.html')
  }),
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: PORTS.BROWSER_SYNC,
    proxy: 'http://127.0.0.1:' + PORTS.DEV_SERVER,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
