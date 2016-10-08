module.exports = {
    entry: './src/polyfill.js',
    output: {
        path: './dist',
        filename: 'polyfill.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};