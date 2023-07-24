const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
    mode: "development",
    entry: './main.js',
    output: {
        // bundle生成位置
        path: path.resolve(__dirname, 'dist'),
        // bundle文件名
        filename: 'bundle.js',
        clean: true,
    },
    performance: { // 关闭性能提示
        hints: false,
    },
    devServer: {
        hot: true,
        static: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',  // 生成HTML文件的模板文件
            filename: 'index.html',  // 生成的HTML文件名
            inject: 'body'  // <script>标签插入的地方
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/images", to: "images" },
                { from: "public/BGM", to: "BGM" },
                {from:"public/SE",to:"SE"}
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
};
