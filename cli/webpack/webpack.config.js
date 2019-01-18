const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {

    const {title, clientUrl, savePath, serverUrl} = env;

    console.log(env);

    // Generate template parameters
    // Should be fixed in html-webpack-plugin version 4 release
    // https://github.com/jantimon/html-webpack-plugin/pull/953
    function templateParametersGenerator (compilation, assets, assetTags, options) {
        const xhtml = options.xhtml;
        assetTags.headTags.toString = function () {
            return this.map((assetTagObject) => htmlTagObjectToString(assetTagObject, xhtml)).join('');
        };
        assetTags.bodyTags.toString = function () {
            return this.map((assetTagObject) => htmlTagObjectToString(assetTagObject, xhtml)).join('');
        };
        return {
            compilation: compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
                tags: assetTags,
                files: assets,
                options: options
            },
            serverScriptUrl: serverUrl
        };
    }

    let htmlWebpackOptions = {
        template: "../public/index.ejs",
        filename: "apploader.html",
        excludeChunks: [],
        title: title,
        templateParameters: templateParametersGenerator
    }

    if (serverUrl !== 'undefined') {
        htmlWebpackOptions.excludeChunks = ["main"];
    }

    return {
        mode: "production",
        context: path.resolve(__dirname, '../src'),
        entry: {
            main: './server.js'
        },
        devtool: 'inline-source-map',
        output: {
            path: savePath,
            filename: 'server.js'
        },
        resolve: {
            extensions: ['.js']
        },
        plugins: [
            new HtmlWebpackPlugin(htmlWebpackOptions),
            new webpack.DefinePlugin({
                __ClientURL__: `"${clientUrl}"`
            })
        ]
    }
}