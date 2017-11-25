// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const config = {
    context: srcPath,
    entry: './index.js',
    output: {
        path: distPath,
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                include: srcPath,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react',
                            'stage-1',
                            ['es2015', { modules: false }]
                        ]
                    }
                }]
            },
            // scss
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            // Fonts
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '/public/fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            Actions: path.resolve(srcPath, 'actions'),
            Screens: path.resolve(srcPath, 'screens'),
            Components: path.resolve(srcPath, 'components'),
            Constants: path.resolve(srcPath, 'constants'),
            Reducers: path.resolve(srcPath, 'reducers'),
            Utilities: path.resolve(srcPath, 'utilities'),
            NodeModules: path.resolve(__dirname, 'node_modules')
        }
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'public/css/main.css'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [ autoprefixer ]
            }
        })
    ]
};

module.exports = config;
