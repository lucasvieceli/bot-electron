const path = require('path');
const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rendererConfig = {
    mode: 'production',
    target: 'electron-renderer',
    entry: ['./src/renderer/index.tsx'],
    module: {
        rules: [
            {
                test: /\.(j|t)s(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: true,
                    },
                },
            },
            ...rules,
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist-webpack', 'renderer'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            inject: true,
        }),
    ],
};

const mainConfig = {
    mode: 'production',
    target: 'electron-main',
    entry: './src/main/index.ts',

    node: {
        __dirname: false,
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            ...rules,
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    //Sqlite3 won't work without this line.
    externals: { sqlite3: 'commonjs sqlite3', robotjs: 'commonjs robotjs' },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist-webpack', 'main'),
    },
};

module.exports = [rendererConfig, mainConfig];
