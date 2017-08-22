// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: 'postcss.config.js'
                }
            }
        },
        'sass-loader'
    ],
    publicPath: '/dist'
});

const cssConfig = isProd ? { use: cssProd } : { loader: cssDev };

const config = {
    context: srcPath,
    entry: './App.js',
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
            Object.assign(
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                },
                cssConfig
            ),
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
