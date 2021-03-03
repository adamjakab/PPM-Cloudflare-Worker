/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  mode: 'development',
  target: 'webworker',
  entry: {
    index: './src/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /test/]
      }
    ]
  },
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'worker-dev')
  },
  devtool: 'source-map'
}
