var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',//在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015', 'react'],
                    "presets": ["react", "es2015"],
                    "env": {
                        "development": {
                            "plugins": [["react-transform", {
                                "transforms": [{
                                    "transform": "react-transform-hmr",

                                    "imports": ["react"],

                                    "locals": ["module"]
                                }]
                            }]]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules!postcss'//添加对样式表的处理
            }
        ]
    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
        , new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
}