//webpack.common.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './runDemo/run.js',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'index',
            filename: "index.html",
            template: "./runDemo/index.run.html"
        })
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')    //定义输出文件夹dist路径
    }
};