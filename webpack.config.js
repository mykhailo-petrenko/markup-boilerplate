const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const isProduction = (process.env.NODE_ENV=='production');

/* eslint-disable no-console */

const webpackConfig = function(env) {
    const isProduction = env.production;

    return {
        devtool: !isProduction && 'cheap-eval-source-map',
        entry: {
            app: path.join(__dirname, 'src/app.js')
        },
        target: 'web',
        output: {
            path: path.join(__dirname, 'target'),
            publicPath: '/',
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src/index.html')
            }),
            new HtmlWebpackPlugin({
                filename: '404.html',
                template: path.join(__dirname, 'src/404.html')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: isProduction
            }),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'src/static'),
                    to: 'static'
                }
            ], {
                ignore: [
                    '*.gitkeep',
                ]
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'src'),
                    loaders: ['babel-loader']
                },
                {
                    test: /(\.css|\.scss)$/,
                    loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                interpolate: true
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'target'),
            compress: true,
            port: 3000
        }
    };
};

/* eslint-enable no-console */

module.exports.default = webpackConfig;