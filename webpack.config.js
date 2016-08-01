// var path = require('path');
var webpack = require('webpack');

//'bootstrap-loader',
module.exports = {
    entry: ['bootstrap-loader','./src/webpackEntry.js'],
    output: {
        path: __dirname,
        filename: './build/public/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery',
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff2',
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            }, {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-otf',
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml',
            }, {
                test: /\.png$/,
                loader: 'file?name=[name].[ext]',
            }, {
                test: /\.jpg$/,
                loader: 'file?name=[name].[ext]',
            }, {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'jQuery': 'jquery'
        })
        // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
