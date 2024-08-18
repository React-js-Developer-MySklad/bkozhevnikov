const { merge } = require("webpack-merge");
const config = require('./webpack.config')

module.exports = merge(config, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]
            },
        ]
    }
})