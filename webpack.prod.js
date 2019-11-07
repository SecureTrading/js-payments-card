const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^\.\.\/\.\.\/environments\/environment/,
      '../../environments/environment.prod'
    ),
    new webpack.NormalModuleReplacementPlugin(/^\.\/environments\/environment/, './environments/environment.prod'),
  ]
});
