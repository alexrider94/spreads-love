const path = require('path');

module.exports = {
    entry: "./client/src/index.js",

    output:{
        path: path.resolve(__dirname, "./client/dist"),
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include:[
                    path.resolve(__dirname,'./client/src')
                ],
                options:{
                    presets: ['react']
                },
            }
        ]
    }
};