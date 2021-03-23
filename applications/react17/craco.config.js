const APP_NAME = require('./package.json').name
const PORT = require('./package.json').devPort
const NODE_ENV = process.env.NODE_ENV || 'development'

log('APP_NAME: ', APP_NAME)
log('NODE_ENV: ', NODE_ENV)

function log (label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}

const cracoConfig = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: NODE_ENV === 'development' ? `http://localhost:${PORT}/` : `./${APP_NAME}/`,
        filename: 'main.js',
        chunkFilename: '[name].[chunkhash:8].js',
        library: 'app-react17',
        jsonpFunction: `webpackJsonp-${APP_NAME}`,
        libraryExport: 'default',
        libraryTarget: 'umd'
      }
      webpackConfig.optimization.splitChunks = false
      webpackConfig.optimization.runtimeChunk = false
      return webpackConfig
    }
  },
  devServer: {
    port: PORT,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
};

module.exports = cracoConfig
