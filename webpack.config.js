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
        loader: 'babel-loader',
        include: srcPath
      },
      // scss
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
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
            name: '/public/fonts/[name].[hash:8].[ext]'
          }
        }]
      },
      // Imagesfile-loader?name=/public/icons/[name].[ext]"
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: '/public/img/[name].[hash:8].[ext]',
          }
        }]
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     Api: path.resolve(srcPath, 'api'),
  //     Screens: path.resolve(srcPath, 'screens'),
  //     Components: path.resolve(srcPath, 'components'),
  //     Constants: path.resolve(srcPath, 'constants'),
  //     Ducks: path.resolve(srcPath, 'ducks'),
  //     Images: path.resolve(srcPath, 'public/img'),
  //     Sagas: path.resolve(srcPath, 'sagas'),
  //     Utilities: path.resolve(srcPath, 'utilities'),
  //     NodeModules: path.resolve(__dirname, 'node_modules')
  //   }
  // },
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
        postcss: [autoprefixer]
      }
    })
  ]
};

module.exports = config;
