const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/add\.html$/, to: '/add.html' },
        { from: /^\/$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ],
      index: 'index.html',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    watchFiles: ['src/**/*'],
    port: 8080,
    open: false,
    hot: true,
    liveReload: true,
  },
});
