var webpack = require('webpack')
var config = require('./webpack.base.config')

config.externals = {
    moment: 'moment'
};

config.plugins = (config.plugins || []).concat([
    // This minifies not only JavaScript, but also
    // the templates (with html-minifier) and CSS (with cssnano)!
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config
