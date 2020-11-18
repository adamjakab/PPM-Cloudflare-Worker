// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  context: __dirname,
  mode: 'development',
  target: 'webworker',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts']
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
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map'
}
