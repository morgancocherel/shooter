'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const platforms = {
  'integ1 public': 'https://integration1.drd-mpd.vsct.fr',
  'cur1 mobile': 'https//current1.mobile.drd-mpd.socrate.vsct.fr',
  'cur1 private': 'https//admin.current1.drd-mpd.socrate.vsct.f',
  'cur1 public': 'https://current1.drd-mpd.socrate.vsct.fr',
  'Pipeline public': 'https://featurempdbuild4488frcmnfct.public.t-mpd.vs.cloud.socrate.vsct.fr',
  'Pipeline mobile': 'https://featurempdbuild4488frcmnfct.mobile.t-mpd.vs.cloud.socrate.vsct.fr',
  'usn1 public': 'https://usine1.drd-mpd.socrate.vsct.fr'
}

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    //Proxy
    proxyTable: {
      '/api': {
        secure: false,
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug',
        router: function (req) {
          return platforms[req.headers.platform]
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: false

  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}