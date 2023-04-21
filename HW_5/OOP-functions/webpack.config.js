const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = {
  entry: {
    app: './oop/app.js'
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000
  },

};
