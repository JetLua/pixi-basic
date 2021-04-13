const os = require('os')
const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = ({env, publicPath}) => {
  const prod = env === 'prod'
  const conf = {
    entry: [
      'bootstrap/dist/css/bootstrap.min.css',
      './src/app.js',
      './src/style.less'
    ],

    output: {
      path: path.resolve('dist'),
      publicPath: publicPath ?? '/',
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
    },

    resolve: {
      alias: {
        '@': path.resolve('.')
      }
    },

    devServer: {
      hot: true,
      host: '0.0.0.0',
      stats: 'errors-only',
      contentBase: '.',
      historyApiFallback: true,
      overlay: {errors: true}
    },

    devtool: prod ? false : 'source-map',

    stats: 'errors-only',

    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.css$/,
          use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        },
        {
          test: /\.txt$/,
          use: ['raw-loader']
        },
        {
          test: /\.(jpg|png|jpeg|gif|svg)$/,
          use: ['url-loader']
        }
      ]
    },

    plugins: [
      new VueLoaderPlugin(),

      new webpack.ProvidePlugin({
        PIXI: 'pixi.js',
        Prism: 'prismjs',
        Router: ['vue-router', 'default'],
        Vue: ['vue/dist/vue.esm.js', 'default'],
      }),

      new HtmlWebpackPlugin({
        template: './src/layout.html',
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true
        }
      })
    ],

    mode: prod ? 'production' : 'development'
  }

  if (prod) {
    conf.plugins.push(new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }))

    conf.optimization = {
      splitChunks: {
        chunks: 'all'
      }
    }
  }

  return conf
}
