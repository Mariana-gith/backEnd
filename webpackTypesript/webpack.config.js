const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports= {
    entry: "./src/index.ts",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "main.js"
    },

    target: 'node', 
    externals: [nodeExternals()],


    module: {
        rules:[
            {
                test:/\.tsx?/,
                exclude:/node_modules/,
                use:"ts-loader"
            }
        ]
    },
    plugins:[
        new NodemonPlugin(),//Dong
    ]
}