const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                test: /\.module\.scss$/, // Target .module.scss files specifically
                use: [
                    'style-loader', // Injects CSS into the DOM
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]', // Generates unique class names
                                namedExport: false,
                            },
                            importLoaders: 2, // Ensures sass-loader and postcss-loader (if used) are applied before css-loader
                        },
                    },
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            {
                test: /\.scss$/, // For regular .scss files (not CSS Modules)
                exclude: /\.module\.scss$/, // Exclude .module.scss files from this rule
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
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