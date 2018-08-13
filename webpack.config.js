/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  serve: {
    port: 36789
  },
  entry: './src/static/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    hashDigestLength: 7,
    filename: 'bundle.[hash].js',
    chunkFilename: '[id].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: process.env.WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader },
          // { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: process.env.WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader },
          // creates style nodes from JS string
          // { loader: 'style-loader' },
          // translates CSS into CommonJS
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          // compiles Less to CSS
          { loader: 'less-loader'},
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          { loader: 'handlebars-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.WEBPACK_SERVE ? 'development' : 'production')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      hashDigestLength: 7,
      filename: 'bundle.[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
};
