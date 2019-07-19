const webpack = require('webpack')
const APP_NAME = require('./package.json').name
const PORT = require('./package.json').devPort
const NODE_ENV = process.env.NODE_ENV || 'development'

log('APP_NAME: ', APP_NAME)
log('NODE_ENV: ', NODE_ENV)

module.exports = {
  publicPath: `/${APP_NAME}/`,

  productionSourceMap: false,

  css: {
    extract: false
  },

  configureWebpack: {
    entry: './src/entry.js',

    // output: {
    //   libraryExport: 'default',
    //   jsonpFunction: `webpackJsonp-${APP_NAME}`
    // },

    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
      })
    ]
  },

  chainWebpack: (config) => {
    if (NODE_ENV === 'development') {
      config.output
        .filename('main.js')
        .chunkFilename('[name].[chunkhash:8].js')
        .jsonpFunction(`webpackJsonp-${APP_NAME}`)
        .library(APP_NAME)
        // .libraryExport('default')
        .libraryTarget('umd')

      config.optimization.splitChunks(false)

      config.plugins
        .delete('html')
        .delete('preload')
        .delete('prefetch')
    }
  },

  devServer: {
    port: PORT
  }
}

function log (label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
