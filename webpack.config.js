var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');

const path = require('path');


/**
 |
 */
var isProd = process.env.NODE_ENV == 'production'; // true or false

var cssDev = ['style-loader', 'css-loader', 'sass-loader'];

var cssProd = ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ['css-loader', 'sass-loader'],
                  publicPath: "/dist"
              });

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
        entry: {
            app: [
                path.resolve(__dirname, "src/app.js"),
                path.resolve(__dirname, "src/other.js")
            ],
            contact: path.resolve(__dirname, "src/contact.js"),
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: cssConfig
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        'file-loader?name=images/[name].[ext]',
                        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ],

                }
            ]
        },
        devServer: {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          port: 8081,
          stats: 'errors-only',
          hot: true
        },
        plugins: [
                new HtmlWebpackPlugin({
                  title: 'HMS',
                //   minify: {
                //       collapseWhitespace: true,
                //   },
                  excludeChunks: ['contact'],
                  hash: true,
                  filename: 'index.html',
                  template: './src/index.html'
              }),

                new HtmlWebpackPlugin({
                  title: 'Contact Page',
                //   minify: {
                //       collapseWhitespace: true,
                //   },
                  chunks: ['contact'],
                  hash: true,
                  filename: 'contact.html',
                  template: './src/contact.html'
              }),

              new ExtractTextPlugin({
                  filename: "styles.css",
                  disable: !isProd,
                  allChunks: true
              }),

              new webpack.HotModuleReplacementPlugin(),

              new webpack.NamedModulesPlugin(),
        ]// plugins
}
