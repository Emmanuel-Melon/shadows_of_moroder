const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        // multiple entry files
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    devtool: "inline-source-map",
    resolve: {
        alias: {
            Music: path.resolve(__dirname, './assets/audio/'),
            Images: path.resolve(__dirname, './assets/img/'),
            Scenes: path.resolve(__dirname, './src/Scenes/')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader",
                    "font-loader"
                ]
            },
            {
                test: /\.(png|svg|jpeg|jpg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(mp3|mp4|wav)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        contentBase: "./dist"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            title: 'Shadows of Mordor'
        })
    ]
};
