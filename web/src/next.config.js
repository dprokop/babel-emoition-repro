const compose = require('lodash/fp/compose')
const webpack = require('webpack')
const dotenv = require('dotenv')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

dotenv.config({ silent: true })

const exposedEnv = {
  API_URL: '',
}

module.exports = compose([
  withSourceMaps,
  config =>
    withBundleAnalyzer({
      ...config,
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
    }),
])({
  distDir: '../build/next',
  poweredByHeader: false,
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(exposedEnv))
    var oldEntry = config.entry
    config.entry = function() {
      return oldEntry().then(function(entries) {
        if (entries['main.js'] && !entries['main.js'].includes('@babel/polyfill')) {
          entries['main.js'].unshift('@babel/polyfill')
        }
        return entries
      })
    }
    return config
  },
})
