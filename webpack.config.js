const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  output: { path: buildPath },
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },
  devServer: { contentBase: 'build', port: 8080, hot: true },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
    new CopyWebpackPlugin([{ from: './src/assets', to: './assets' }]),
    new HTMLWebpackPlugin(
      { template: 'index.html', filename: 'index.html' })
  ]
}