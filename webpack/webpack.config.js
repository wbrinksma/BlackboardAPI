const path = require('path');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../src'),
    entry: {
        client: './entries/client.ts',
        server: './entries/server.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'BB',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    }
}