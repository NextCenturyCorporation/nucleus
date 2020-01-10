const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([{
                context: 'node_modules/@webcomponents/webcomponentsjs',
                from: '**/*.js',
                to: 'webcomponents'
            }])
        ]
    }
};
