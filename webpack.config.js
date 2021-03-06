const path = require("path");
const entryFile = "app.js";

module.exports = {
    entry: [`./js/${entryFile}`, './css/main.scss'],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `/build`)
    },
    devServer: {
        contentBase: path.join(__dirname),
        publicPath: "/build/",
        compress: true,
        port: 3001,
        historyApiFallback: true
    },
    watch: false,
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            }
        ]
    }
};
