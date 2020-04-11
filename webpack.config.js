const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/dist/'
    },
    watch: false,
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/css', to: '../css' },
            { from: 'src/assets', to: '../assets' }
        ])
    ]
}
