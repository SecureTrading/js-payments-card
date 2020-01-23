const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    example: './example/index.ts',
    stcard: './src/STCard.ts',
    stcardstyle: './src/styles/card.scss'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'Card',
    libraryExport: 'default',
    libraryTarget: 'umd',
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {}
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      chunks: ['example']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new StyleLintPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      HOST: JSON.stringify(process.env.npm_package_config_host)
    }),
    new webpack.ProvidePlugin({ Promise: 'es6-promise-promise' })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.tsx?|js$/,
        use: 'babel-loader',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'test'), path.join(__dirname, 'example')]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: [
          /index\.html$/,
          /node_modules/,
        ],
        use: { loader: 'html-loader' }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
