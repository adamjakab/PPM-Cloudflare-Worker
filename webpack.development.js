const path = require('path');

module.exports = {
  mode: 'development',
  target: 'webworker',
  entry: {
    'index': './src/index.ts',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map'
}
