const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoaderWithAutoUse = {
        loader: 'sass-loader',
        options: {
            additionalData: `@use '@/_vars' as *;`,
            sassOptions: {
                includePaths: [path.resolve(__dirname, 'src')],
            },
        },
}

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                namedExport: false,
                            },
                            importLoaders: 2,
                        },
                    },
                    sassLoaderWithAutoUse,
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    sassLoaderWithAutoUse,
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src/styles'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        hot: true,
        open: true,
    },
};