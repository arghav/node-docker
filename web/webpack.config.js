var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var config = require('config');

var port = config.get('http').port;

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: debug ? ['babel-polyfill', 'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr', './index.js'] :
    ['babel-polyfill', './index.js'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  output: debug ? {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:' + port + '/'
  } : {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  plugins: debug ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true }, mangle: false, sourcemap: false })
  ]
};
