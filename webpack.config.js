// const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    cache: false,
    entry: [
        path.resolve(__dirname, 'black.js')
    ],
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        // preLoaders: [{
        //     test: /\.jsx$/,
        //     loader: "eslint-loader",
        //     exclude: /node_modules/
        // }],
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "postcss", "sass"]
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url?limit=40000'
            // },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            }]
    },
    postcss: function () {
        return [precss, autoprefixer]
    },
    // plugins: [
    //         new webpack.optimize.UglifyJsPlugin({
    //             compress: {
    //                 warnings: false,
    //             }
    //         })
    // ],
    plugins: [
        new DashboardPlugin()
    ]
};