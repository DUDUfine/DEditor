const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin}  = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
              // 'syntax-dynamic-import',
              '@babel/transform-runtime',
              '@babel/plugin-transform-modules-commonjs' 
          ],
          presets: [
              '@babel/preset-env'
          ],
          cacheDirectory: true
        },
      },
      
      // exclude: [/node_modules/, path.resolve('src/lib/ueditor')]
    },{
      test: /\.(css|scss|less)$/,
      use: ['style-loader', 'css-loader']
    },{
      test: /\.(png|jpg|gif)$/i,
      use: 'url-loader'
    }]
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new CleanWebpackPlugin(),
  ] : [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '百度富文本编辑器',
      template: 'ueditor.html', // 源模板文件
      filename: 'ueditor.html',
      inject: 'head',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    openPage: 'ueditor.html',
    index: 'ueditor.html',
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    inline: true
  },
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'source-map'
}

// if (process.env.NODE_ENV === 'development') {
//   module.exports = {
//     devtool: 'source-map',
//     plugins: (module.exports.plugins || []).concat([
//       new HtmlWebpackPlugin({
//         title: '百度富文本编辑器',
//         template: 'ueditor.html', // 源模板文件
//         filename: 'ueditor.html',
//         inject: 'head',
//       })
//     ])
//   }
// }

// } else if (process.env.NODE_ENV === 'production') {
//   module.exports = {
//     devtool: 'cheap-module-source-map'
//   }
// }