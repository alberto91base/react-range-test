const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === 'production';
    return {
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProduction ?  '[name].[contenthash].js': 'main.js',
            publicPath: '/',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-react',
                                {
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
        ],
        devServer: {
            host: 'localhost',
            port: 8080,
            historyApiFallback: true,
            open: false,
            hot: true,
        },
    };
};
