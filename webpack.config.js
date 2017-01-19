const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
    entry: './View/src/index.js',
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            test: /\.js$/
        }, {
            loader: ExtractTextPlugin.extract(['css-loader?sourceMap!sass-loader?sourceMap']),
            test: /\.scss$/
        }]
    },
    output: {
        filename: 'bundle.js',
        path: './View/public'
    },
    resolve: {extensions: ['', '.js', '.json']},
    sassLoader: {outputStyle: 'extended'},
    plugins: [new CleanWebpackPlugin(['View/public'], {
        verbose: true
    }), new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'View/src/index-template.html'
    })]
};

if (process.env.NODE_ENV === 'production') {
    webpackConfig.devtool = 'source-map';

    const time = new Date().getTime();
    const stylesProd = new ExtractTextPlugin(`${time}-bundle.css`);
    webpackConfig.output.filename = `${time}-bundle.js`;
    webpackConfig.plugins.push(stylesProd, new webpack.optimize.OccurenceOrderPlugin(), new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify('production')}
    }), new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
} else {
    const styles = new ExtractTextPlugin('app.css');
    webpackConfig.plugins.push(styles);
}

module.exports = webpackConfig;
