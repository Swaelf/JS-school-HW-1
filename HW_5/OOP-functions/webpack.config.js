const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './oop/app.ts'
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
    'node_modules',
    'oop',
    'Functions'
    ],
  }
};
