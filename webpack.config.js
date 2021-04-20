const os = require('os')
const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = ({env, publicPath}) => {
  const prod = env === 'prod'
  const conf = {
    entry: ['./src/app.ts'],

    target: prod ? 'browserslist' : 'web',

    output: {
      path: path.resolve('dist'),
      publicPath: publicPath ?? '/',
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
    },

    resolve: {
      alias: {
        '@': path.resolve('.'),
        '~': path.resolve('src'),
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
              hotReload: !prod,
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

    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
            reuseExistingChunk: true
          },
          common: {
            name: 'common',
            priority: -1,
            chunks: 'all',
            reuseExistingChunk: true
          }
        }
      }
    },

    mode: prod ? 'production' : 'development'
  }

  if (prod) {
    Object.assign(config.optimization, {
      minimize: true,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin({
          parallel: 8,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false
            }
          },
        })
      ]
    })

    conf.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash:8].css'
      }),
    )
  } else {
    const StylelintPlugin = require('stylelint-webpack-plugin')
    const ProgressBarPlugin = require('progress-bar-webpack-plugin')

    conf.plugins.push(
      new ESLintPlugin({
        extensions: ['.js', '.ts', '.vue'],
        outputReport: true
      }),
      new StylelintPlugin({
        files: ['**/*.less']
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin(),
    )
  }

  return conf
}
